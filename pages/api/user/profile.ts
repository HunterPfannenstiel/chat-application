import { User } from "models/User";
import { NextApiHandler } from "next";
import { createError, getUserSession } from "../utils";
import { defaultUser } from "@_types/user";
const handler: NextApiHandler = async (req, res) => {
  try {
    if (req.method === "GET") {
      const { handle } = req.query;
      const session = await getUserSession(req, res);
      if (handle === "defaultuser")
        return res
          .status(200)
          .json({ user: defaultUser, isUsersProfile: false });
      if (typeof handle === "string") {
        const user = await User.fetchByHandle(handle, session?.user.userId);
        return res
          .status(200)
          .json({ user, isUsersProfile: user.userId === session?.user.userId });
      }
      const e = createError("No user handle provided", 400);
      throw e;
    }
    return res.status(200);
  } catch (error: any) {
    if (!error.statusCode) error.statusCode = 500;
    if (error.redirect) error.redirect();
    else return res.status(error.statusCode).json({ message: error.message });
  }
};
export default handler;
