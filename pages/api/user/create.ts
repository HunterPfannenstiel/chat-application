import { NextApiHandler } from "next";
import multer from "multer";
import { createError, sendErrorResponse } from "../utils";
import { User } from "models/User";
import { getSession } from "next-auth/react";
import { SessionToken } from "@_types/auth";
import { uploadFile } from "utils/cloudinary";

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
const handler: NextApiHandler = (req, res) => {
  if (req.method === "POST") {
    try {
      imageParser(req as any, res as any, async (err) => {
        if (!err) {
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
          uploadFile(fileReq.file.buffer, async (imageUrl, publicId) => {
            console.log(imageUrl);
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
              ethereumAddress: session.user.isWeb3
                ? session.user.name
                : undefined,
            });
            res.status(200).json({ message: "uploaded user", id: userId });
          });
        }
      });
    } catch (error) {
      return sendErrorResponse(error, res);
    }
  } else {
    return res.status(400).json({ message: "Invalid method" });
  }
};
export default handler;
