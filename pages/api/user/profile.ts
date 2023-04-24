import { SessionToken } from "@_types/auth";
import { User } from "models/User";
import { NextApiHandler } from "next";
import { getSession } from "next-auth/react";
import { createError, sendErrorResponse } from "../utils";
const handler: NextApiHandler = async (req, res) => {
  try {
    if (req.method === "GET") {
      const { handle } = req.query;
      const session = (await getSession({ req })) as SessionToken | null;
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
    return sendErrorResponse(error, res);
  }
};
export default handler;
