import { NextApiHandler } from "next";
import { getUserSession } from "../utils";
import { User } from "models/User";
const handler: NextApiHandler = async (req, res) => {
  if (req.method === "POST") {
    try {
      const session = await getUserSession(req, res, true);
      const { followingUserId, action } = req.body;
      await User.follow(session!.user.userId, followingUserId, action);
      res.status(200).json({ message: `${action}ed user` });
    } catch (error: any) {
      if (error.redirect) error.redirect();
      else return res.status(error.statusCode).json({ message: error.message });
    }
  } else {
    return res.status(400).json({ message: "Invalid method" });
  }
};
export default handler;
