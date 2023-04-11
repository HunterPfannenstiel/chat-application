import { SessionToken } from "@_types/auth";
import { User } from "models/User";
import { NextApiHandler } from "next";
import { getSession } from "next-auth/react";
const handler: NextApiHandler = async (req, res) => {
  if (req.method === "GET") {
    const { params } = req.query;
    console.log(req.query);
    if (params) {
      try {
        if (params?.length === 1) {
          const session = (await getSession({ req })) as SessionToken | null;
          let userId = "";
          if (session) {
            userId = session.user.userId;
          }
          const user = await User.fetchProfile(params[0]);
          return res
            .status(200)
            .json({ user, isUsersProfile: userId == params[0] });
        } else if (params?.length === 2) {
          const detail = params[0];
          const userId = params[1];
          if (detail === "followers") {
            console.log("Fetching followers");
            const followers = await User.fetchFollowers(userId);
            return res.status(200).json({ followers });
          } else {
            console.log("Fetching following");
            const following = await User.fetchFollowing(userId);
            return res.status(200).json({ following });
          }
        }
      } catch (error: any) {
        if (!error.statusCode) error.statusCode = 500;
        return res.status(error.statusCode).json({ message: error.message });
      }
    }
  } else {
    return res.status(400).json({ message: "Invalid method" });
  }
};
export default handler;
