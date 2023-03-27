import { SessionToken } from "@_types/auth";
import { User } from "models/User";
import { UpdateUser, User as UserT } from "types/user";
import { NextApiHandler } from "next";
import { getSession } from "next-auth/react";
import { createError } from "../utils";
const handler: NextApiHandler = async (req, res) => {
  try {
    if (req.method === "POST") {
      const user = req.body.user as UserT;
      if (!user) {
        const e = createError("User details not provided", 400);
        throw e;
      }
      console.log("CREATE USER");
      await User.create(user);

      return res.status(200).json({ message: "User created" });
    } else if (req.method === "PUT") {
      const updates = req.body.updates as UpdateUser;
      if (!updates) {
        const e = createError("User updates not provided", 400);
        throw e;
      }
      console.log("UPDATE USER");
      const session = (await getSession({ req })) as SessionToken | null;
      if (session) {
        await User.update(session.user.name, updates);
        return res.status(201).json({ message: "Updated user successfully" });
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
