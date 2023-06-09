import { NextApiHandler } from "next";
import multer from "multer";
import {
  createError,
  getUserSession,
  parseImage,
  sendErrorResponse,
} from "../utils";
import { User } from "models/User";
import { getSession } from "next-auth/react";
import { SessionToken } from "@_types/auth";
import { deleteImage, uploadImage } from "utils/cloudinary";

let imageParser = multer({
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith("image/")) {
      cb(null, true);
    } else {
      cb(null, false);
    }
  },
}).single("image");

export const config = {
  api: {
    bodyParser: false,
  },
};
const handler: NextApiHandler = async (req, res) => {
  if (req.method === "POST") {
    let publicId: string | undefined = "";
    try {
      await parseImage(req, res, imageParser, true);
      const session = (await getSession({ req })) as SessionToken | null;
      if (!session) {
        const error = createError(
          "Please sign-in before creating an account!",
          400
        );
        throw error;
      }
      if (!session.user.isNew) {
        const error = createError("Account already exists!", 400);
        throw error;
      }
      const fileReq = req as any;
      if (!fileReq.file) {
        const error = createError("Please add an image", 400);
        throw error;
      }
      const { name, handle, bio } = req.body;
      if (!name) {
        const error = createError("Please add a name!", 400);
        throw error;
      } else if (!handle) {
        const error = createError("Please add a handle!", 400);
        throw error;
      } else if (!bio) {
        const error = createError("Please add a bio!", 400);
        throw error;
      }
      const imageInfo = await uploadImage(fileReq.file.buffer);
      const imageUrl = imageInfo.imageUrl;
      publicId = imageInfo.publicId;
      if (!imageUrl) {
        const error = createError("Image url not returned", 500);
        throw error;
      }
      if (!publicId) {
        const error = createError("No publicId", 500);
        throw error;
      }
      const userId = await User.create({
        userHandle: handle,
        userImage: imageUrl,
        userName: name,
        bio,
        publicId,
        email: !session.user.isWeb3 ? session.user.name : undefined,
        ethereumAddress: session.user.isWeb3 ? session.user.name : undefined,
      });
      res.status(200).json({ message: "uploaded user", id: userId });

      // console.log("calling fetch");
      // const response = await fetch(
      //   `${process.env.NEXTAUTH_URL}/api/auth/session?createUser=true`
      // );
      // console.log("response", response);
      // res.status(200).json({ message: "uploaded user" });
    } catch (error) {
      if (publicId) deleteImage(publicId);
      return sendErrorResponse(error, res);
    }
  } else if (req.method === "PUT") {
    let publicId;
    try {
      const session = await getUserSession(req, res, true);
      await parseImage(req, res, imageParser, true);
      const fileReq = req as any;
      const { userName, userHandle, bio } = req.body;
      let imageUrl;
      let aspectRatio;
      if (fileReq.file) {
        const imageInfo = await uploadImage(fileReq.file.buffer, true);
        imageUrl = imageInfo.imageUrl;
        publicId = imageInfo.publicId;
        aspectRatio = imageInfo.aspectRatio;
        if (!imageUrl) {
          const error = createError("Image url not returned", 500);
          throw error;
        }
        if (!publicId) {
          const error = createError("No publicId", 500);
          throw error;
        }
      }
      let newImage;
      if (imageUrl && publicId && aspectRatio) {
        newImage = { imageUrl, publicId, aspectRatio };
      }

      const oldImageId = await User.update(
        session!.user.userId,
        {
          userName: userName === "null" ? null : userName,
          userHandle: userHandle === "null" ? null : userHandle,
          bio: bio === "null" ? null : bio,
        },
        newImage
      );
      if (oldImageId) {
        deleteImage(oldImageId);
      }
      return res.status(200).json({ message: "Upated User!" });
    } catch (error: any) {
      if (publicId) {
        console.log("deleted image", publicId);
        deleteImage(publicId);
      }
      if (error.redirect) error.redirect();
      else return res.status(error.statusCode).json({ message: error.message });
    }
  } else {
    return res.status(400).json({ message: "Invalid method" });
  }
};

export default handler;
