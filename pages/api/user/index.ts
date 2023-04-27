import { SessionToken } from "@_types/auth";
import { User } from "models/User";
import { NextApiHandler } from "next";
import { getUserSession } from "../utils";
import { UserDetails, defaultUser } from "@_types/user";
const handler: NextApiHandler = async (req, res) => {
  try {
    if (req.method === "GET") {
      const { handle } = req.query;
      const user = (await getUserSession(req, res)) as SessionToken | null;
      let userDetails: UserDetails;
      if (user?.user.userId) {
        userDetails = await User.fetchDetails(user.user.userId);
      } else {
        userDetails = defaultUser;
      }
      return res.status(200).json({ userDetails });
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
