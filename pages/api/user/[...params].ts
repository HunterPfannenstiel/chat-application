import { User } from "models/User";
import { NextApiHandler } from "next";
import { getUserSession } from "../utils";
import { FeedPost } from "@_types/post/feed-post";
const handler: NextApiHandler = async (req, res) => {
  if (req.method === "GET") {
    const { params } = req.query;
    console.log(req.query);
    if (params) {
      try {
        if (params?.length === 1) {
          const userId = (await getUserSession(req))?.user?.userId;

          const user = await User.fetchProfile(params[0], userId);
          if (user.posts) {
            user.posts = await JSON.parse(user.posts);
          }
          return res
            .status(200)
            .json({ user, isUsersProfile: userId == +params[0] });
        } else if (params?.length === 2) {
          const detail = params[0];
          const handle = params[1];
          if (detail === "followers") {
            console.log("Fetching followers");
            const followers = await User.fetchFollowers(handle);
            return res.status(200).json({ followers });
          } else {
            console.log("Fetching following");
            const following = await User.fetchFollowing(handle);
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
