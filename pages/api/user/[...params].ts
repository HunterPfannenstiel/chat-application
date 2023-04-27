import { User } from "models/User";
import { NextApiHandler } from "next";
import { getUserSession } from "../utils";
import { SessionToken } from "@_types/auth";
const handler: NextApiHandler = async (req, res) => {
  if (req.method === "GET") {
    const { params, page, date, category } = req.query;
    if (params && typeof page === "string" && typeof date === "string") {
      try {
        const session = (await getUserSession(req, res)) as SessionToken | null;
        if (params?.length === 1) {
          const posts = await User.fetchPosts(
            params[0],
            {
              queryUserId: session?.user.userId,
              page: +page,
              createdDateTime: date,
            },
            typeof category === "string" ? category : undefined
          );
          return res.status(200).json({ posts });
        } else if (params?.length === 2) {
          const detail = params[0];
          const handle = params[1];
          if (detail === "followers") {
            const followers = await User.fetchFollowers(handle, {
              queryUserId: session?.user.userId,
              page: +page,
              createdDateTime: date,
            });
            return res.status(200).json({ followers });
          } else {
            const following = await User.fetchFollowing(handle, {
              queryUserId: session?.user.userId,
              page: +page,
              createdDateTime: date,
            });
            return res.status(200).json({ following });
          }
        }
      } catch (error: any) {
        if (!error.statusCode) error.statusCode = 500;
        if (error.redirect) error.redirect();
        else
          return res.status(error.statusCode).json({ message: error.message });
      }
    }
  } else {
    return res.status(400).json({ message: "Invalid method" });
  }
};
export default handler;
