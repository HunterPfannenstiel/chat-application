import { NextApiHandler } from "next";
import type { FeedPost } from "@_types/post/feed-post";
import { mockFeedPosts } from "mock-data/posts";
import jwt from "jsonwebtoken";
import { SessionToken } from "next-auth/core/lib/cookie";
import { getSession } from "next-auth/react";
const handler: NextApiHandler = async (req, res) => {
  if (req.method === "GET") {
    //VERIFY JWT
    const session = await getSession({ req });
    const auth = req.cookies["next-auth.session-token"];
    console.log("API SESSION", session);
    // if (auth) {
    //   try {
    //     const payload = jwt.verify(
    //       auth,
    //       process.env.NEXTAUTH_SECRET!
    //     ) as SessionToken;
    //     console.log("Token", payload);
    //   } catch (error) {
    //     console.log(error);
    //   }
    // }
    //GET USER
    //CHECK PAGINATION QUERY
    //MAKE DB QUERY
    return res.status(200).json({ posts: mockFeedPosts });
  } else {
    return res.status(400).end();
  }
};
export default handler;
