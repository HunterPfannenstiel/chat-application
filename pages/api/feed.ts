import { NextApiHandler } from "next";
import { getSession } from "next-auth/react";
import { FeedPost } from "models/FeedPost";
import { SessionToken } from "@_types/auth";
const handler: NextApiHandler = async (req, res) => {
  if (req.method === "GET") {
    //VERIFY JWT
    const session = (await getSession({ req })) as SessionToken | null;
    console.log("API SESSION", session);

    //GET USER
    //CHECK PAGINATION QUERY
    //MAKE DB QUERY
    if (session) {
      const user = await FeedPost.fetchFeed(session.userId);
      return res.status(200).json({ user });
    } else {
      res.status(400).json({ message: "Please sign-in" });
    }
  } else {
    return res.status(400).end();
  }
};
export default handler;
