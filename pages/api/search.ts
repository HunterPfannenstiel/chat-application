import { User } from "models/User";
import { NextApiHandler } from "next";

import { getUserSession } from "./utils";
const handler: NextApiHandler = async (req, res) => {
  try {
    if (req.method === "GET") {
      const { searchTerm, page, date } = req.query;
      const term = typeof searchTerm === "string" ? searchTerm : "";
      const session = await getUserSession(req, res);
      if (typeof page === "string" && typeof date === "string") {
        const users = await User.search(
          term,
          { page: +page, createdDateTime: date },
          session?.user.userId
        );
        return res.status(200).json({ users });
      }

      return;
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
