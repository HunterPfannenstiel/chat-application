import { NextApiHandler } from "next";
import { getSession } from "next-auth/react";
import { FeedPost } from "models/FeedPost";
import { SessionToken } from "@_types/auth";
const handler: NextApiHandler = async (req, res) => {
  try {
    if (req.method === "GET") {
      //VERIFY JWT
      const session = (await getSession({ req })) as SessionToken | null;
      console.log("API SESSION", session);

      //GET USER
      //CHECK PAGINATION QUERY
      //MAKE DB QUERY
      const { global } = req.query;
      if (global || !session || !session.user.userId) {
        console.log("Global fetch");

        const user = await FeedPost.fetchFeed(1);
        if (user.posts) {
          user.posts = JSON.parse(user.posts);
        }
        console.log(user);

        return res.status(200).send({ user, isSignedIn: !!session });
      } else if (session) {
        //session.user.userId
        const user = await FeedPost.fetchFeed(1);
        if (user.posts) {
          user.posts = JSON.parse(user.posts);
        }
        return res.status(200).send({ user, isSignedIn: true });
      } else {
        return res.status(400).json({ message: "Please sign-in" });
      }
    } else {
      return res.status(400).end();
    }
  } catch (error: any) {
    if (!error.statusCode) error.statusCode = 500;
    return res.status(error.statusCode).json({ message: error.message });
  }
};
export default handler;
