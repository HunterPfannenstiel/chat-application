import { SessionToken } from "@_types/auth";
import { User } from "models/User";
import { NextApiHandler } from "next";
import { getSession } from "next-auth/react";
const handler: NextApiHandler = async (req, res) => {
  try {
    if (req.method === "GET") {
      const { searchTerm } = req.query;
      const term = typeof searchTerm === "string" ? searchTerm : "";
      const session = (await getSession({ req })) as SessionToken | null;
      if (session?.user.userId) {
        const users = await User.search(term, session.user.userId);
        return res.status(200).json({ users });
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
