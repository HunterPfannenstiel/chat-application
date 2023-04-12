import FeedPost from "models/FeedPost";
import { NextApiHandler } from "next";
const handler: NextApiHandler = async (req, res) => {
  try {
    if (req.method === "POST") {
      const action = req.query.action as string | undefined;
      const { userId, postId } = req.body;
      if (action === "create" || action === "delete") {
        await FeedPost.like(postId, userId, action);
        res.status(200).json({ message: `Like ${action}d` });
      } else {
        res.status(400).json({ message: "invalid request" });
      }
    } else {
      return res.status(400).json({ message: "Invalid method" });
    }
  } catch (error: any) {
    if (!error.statusCode) error.statusCode = 500;
    return res.status(error.statusCode).json({ message: error.message });
  }
};
export default handler;
