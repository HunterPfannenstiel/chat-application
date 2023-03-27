import { User } from "models/User";
import { NextApiHandler } from "next";
const handler: NextApiHandler = async (req, res) => {
  if (req.method === "GET") {
    const { params } = req.query;
    console.log(req.query);
    if (params) {
      try {
        if (params?.length === 1) {
          const user = await User.fetchProfile("123");
          return res.status(200).json({ user });
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
    return res.status(400).end();
  }
};
export default handler;
