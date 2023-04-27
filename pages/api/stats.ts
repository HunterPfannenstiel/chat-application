import { NextApiHandler } from "next";
import { createError, getUserSession } from "./utils";
import { User } from "models/User";
const handler: NextApiHandler = async (req, res) => {
  try {
    if (req.method === "GET") {
      const { handle } = req.query;
      if (typeof handle !== "string") {
        const e = createError("Handle not provided", 400);
        throw e;
      }
      const session = await getUserSession(req, res);
      const analytics = await User.fetchAnalytics(handle, session?.user.userId);
      return res.status(200).json({ analytics });
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
