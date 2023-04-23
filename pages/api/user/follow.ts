import { NextApiHandler } from "next";
import { getUserSession, sendErrorResponse } from "../utils";
import { User } from "models/User";
const handler: NextApiHandler = async (req, res) => {
  if (req.method === "POST") {
    try {
      const session = await getUserSession(req);
      const { followingUserId, action } = req.body;
      await User.follow(session.user.userId, followingUserId, action);
      res.status(200).json({ message: "followed user!" });
    } catch (error) {
      return sendErrorResponse(error, res);
    }
  } else {
    return res.status(400).json({ message: "Invalid method" });
  }
};
export default handler;
