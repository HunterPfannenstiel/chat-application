import { SessionToken } from "@_types/auth";
import { Post, UpdatePost } from "@_types/post";
import FeedPost from "models/FeedPost";
import { NextApiHandler } from "next";
import { getSession } from "next-auth/react";
import { createError } from "../utils";
const handler: NextApiHandler = async (req, res) => {
  try {
    if (req.method === "POST") {
      console.log("CREATE POST");
      const post = req.body as Post;
      if (!post) {
        const e = createError("Post content not provided", 400);
        throw e;
      }
      await FeedPost.create(post);
      return res.status(201).json({ message: "NOT IMPLEMENTED" });
    } else if (req.method === "PUT") {
      const updates = req.body.updates as UpdatePost;
      const { postId } = req.body;
      if (!updates) {
        const e = createError("Post updates not provided", 400);
        throw e;
      } else if (!postId) {
        const e = createError("PostId not provided", 400);
        throw e;
      }
      console.log("UPDATE POST");
      await FeedPost.update(postId, updates);
      return res.status(201).json({ message: "NOT IMPLEMENTED" });
    } else if (req.method === "DELETE") {
      console.log("DELETE POST");
      const session = (await getSession({ req })) as SessionToken | null;
      if (!session) {
        const e = createError("Please sign-in!", 401);
        throw e;
      }
      const { postId } = req.body;
      if (!postId) {
        const e = createError("PostId not provided", 400);
        throw e;
      }
      const poster = await FeedPost.fetchPoster(postId);
      if (poster === session.user.name) {
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
    return res.status(error.statusCode).json({ message: error.message });
  }
};
export default handler;
