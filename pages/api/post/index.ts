import { ClientPost, ImageUpload } from "@_types/post";
import FeedPost from "models/FeedPost";
import { NextApiHandler } from "next";
import { createError, getUserSession, parseImage } from "../utils";
import multer from "multer";
import { deleteImage, uploadManyImages } from "utils/cloudinary";

export const config = {
  api: {
    bodyParser: false,
  },
};

let imageParser = multer({
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith("image/")) {
      cb(null, true);
    } else {
      cb(null, false);
    }
  },
}).array("images", 4);
const handler: NextApiHandler = async (req, res) => {
  let publicIds: string[] = [];
  try {
    if (req.method === "POST") {
      const session = await getUserSession(req, res, true);
      const files = await parseImage(req, res, imageParser, false);
      const { content, replyToPostId, communityId } = req.body as ClientPost;
      if (!content) {
        const e = createError("Post content not provided", 400);
        throw e;
      }
      const images = (await uploadManyImages(
        files.map((image: any) => image.buffer)
      )) as ImageUpload[];
      publicIds = images.map((image) => image.publicId);
      const post = await FeedPost.create({
        content,
        userId: session!.user.userId,
        replyToPostId:
          replyToPostId === "undefined" ? undefined : replyToPostId,
        communityId: communityId === "undefined" ? undefined : communityId,
        images,
      });
      return res.status(201).json({ message: "Success!", post });
    } else if (req.method === "PUT") {
      const files = await parseImage(req, res, imageParser, false);
      const { postId, content, deleteImages } = req.body;
      if (!postId) {
        const e = createError("PostId not provided", 400);
        throw e;
      }

      const removeImages = deleteImages !== "false";

      let images;
      if (files) {
        images = (await uploadManyImages(
          files.map((image: any) => image.buffer)
        )) as ImageUpload[];
        publicIds = images.map((image) => image.publicId);
      }
      const removedImages = await FeedPost.update(
        postId,
        {
          content,
          images,
        },
        removeImages
      );
      if (removedImages && removedImages.length > 0) {
        removedImages.forEach((image) => deleteImage(image.publicId));
      }
      return res
        .status(201)
        .json({ message: "Updated post!", post: { content, images } });
    } else if (req.method === "DELETE") {
      const session = await getUserSession(req, res, true);
      const { postId } = req.body;
      if (!postId) {
        const e = createError("PostId not provided", 400);
        throw e;
      }
      const poster = await FeedPost.fetchPoster(postId);
      if (+poster === session!.user.userId) {
        await FeedPost.delete(postId);
      } else {
        const e = createError("You do not own this post!", 401);
        throw e;
      }
      return res.status(201).json({ message: "NOT IMPLEMENTED" });
    } else {
      return res.status(400).json({ message: "Invalid method" });
    }
  } catch (error: any) {
    if (!error.statusCode) error.statusCode = 500;
    if (publicIds.length > 0)
      publicIds.forEach((id) => {
        console.log(`Delete ${id}`);
        deleteImage(id);
      });
    if (error.redirect) error.redirect();
    else return res.status(error.statusCode).json({ message: error.message });
  }
};
export default handler;
