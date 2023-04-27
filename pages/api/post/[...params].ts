import { FeedPost } from "models/FeedPost";
import { NextApiHandler } from "next";
import { getUserSession } from "../utils";
const handler: NextApiHandler = async (req, res) => {
  try {
    if (req.method === "GET") {
      const { params, page, date } = req.query;
      if (params) {
        const session = await getUserSession(req, res);
        //params[0] = postId
        if (params.length === 1 && +params[0]) {
          const pageParams =
            typeof page === "string" && typeof date === "string"
              ? { page: +page, createdDateTime: date }
              : undefined;
          const post = await FeedPost.fetch(
            +params[0],
            session?.user.userId,
            pageParams
          );

          return res.status(200).json({ post });
        } else if (params.length === 2) {
          const detail = params[0];
          const postId = params[1];
          if (detail === "likes") {
            const likes = await FeedPost.fetchLikes(postId);
            return res.status(200).json({ likes });
          }
        } else {
          return res.status(400).json({ message: "Invalid method" });
        }
      } else {
        return res.status(400).json({ message: "Invalid method" });
      }
    } else {
      return res.status(400).json({ message: "Invalid method" });
    }
  } catch (error: any) {
    if (!error.statusCode) error.statusCode = 500;
    if (error.redirect) error.redirect();
    else return res.status(error.statusCode).json({ message: error.message });
  }
};
export default handler;
