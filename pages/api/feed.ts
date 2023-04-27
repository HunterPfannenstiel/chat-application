import { NextApiHandler } from "next";
import { FeedPost } from "models/FeedPost";
import { getUserSession } from "./utils";
const handler: NextApiHandler = async (req, res) => {
  try {
    if (req.method === "GET") {
      //VERIFY JWT
      const session = await getUserSession(req, res);

      //GET USER
      //CHECK PAGINATION QUERY
      //MAKE DB QUERY
      const { global, page, date } = req.query;
      if (typeof page === "string" && typeof date === "string") {
        if (global || !session || !session.user.userId) {
          const posts = await FeedPost.fetchGlobal(
            { page: +page, createdDateTime: date },
            session?.user?.userId
          );
          // if (user.posts) {

          //   user.posts = JSON.parse(user.posts);
          // }

          return res.status(200).send({ posts, isSignedIn: !!session });
        } else if (session) {
          //session.user.userId
          const posts = await FeedPost.feedPage(session.user.userId, {
            page: +page,
            createdDateTime: date,
          });
          return res.status(200).send({ posts, isSignedIn: true });
        } else {
          return res.status(400).json({ message: "Please sign-in" });
        }
      }
    } else {
      return res.status(400).end();
    }
  } catch (error: any) {
    if (!error.statusCode) error.statusCode = 500;
    if (error.redirect) error.redirect();
    else return res.status(error.statusCode).json({ message: error.message });
  }
};
export default handler;
