import { SessionToken } from "@_types/auth";
import { User } from "models/User";
import { NextApiHandler } from "next";
import { getSession } from "next-auth/react";
import { sendErrorResponse } from "../utils";
import { UserDetails } from "@_types/user";
const handler: NextApiHandler = async (req, res) => {
  try {
    if (req.method === "GET") {
      const { handle } = req.query;
      const user = (await getSession({ req })) as SessionToken | null;
      let userDetails: UserDetails;
      if (user?.user.userId) {
        userDetails = await User.fetchDetails(user.user.userId);
      } else {
        userDetails = {
          userHandle: "defaultuser",
          userName: "DefaultUser",
          userImage:
            "https://res.cloudinary.com/dwg1i9w2u/image/upload/v1682219857/DefaultUser_ou2hrg.jpg",
          followerCount: 0,
          followingCount: 0,
          userId: 0,
        };
      }
      return res.status(200).json({ userDetails });
    } else {
      return res.status(400).json({ message: "Invalid method" });
    }
  } catch (error: any) {
    if (!error.statusCode) error.statusCode = 500;
    return sendErrorResponse(error, res);
  }
};
export default handler;
