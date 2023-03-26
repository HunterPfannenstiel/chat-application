import { NextApiHandler } from "next";
import { getSession } from "next-auth/react";
import { FeedPost } from "models/FeedPost";
const handler: NextApiHandler = async (req, res) => {
  if (req.method === "GET") {
    //VERIFY JWT
    const session = await getSession({ req });
    const auth = req.cookies["next-auth.session-token"];
    console.log("API SESSION", session);

    //GET USER
    //CHECK PAGINATION QUERY
    //MAKE DB QUERY
    const feed = await FeedPost.fetchFeed("1234");
    return res.status(200).json({ posts: feed });
  } else {
    return res.status(400).end();
  }
};
export default handler;
