import { v4 } from "uuid";
import withSession, { addressCheckMiddleware } from "./utils";
import { NextApiRequest } from "next";
import { Verification } from "@_types/api/verify";

export default withSession(
  async (req: NextApiRequest & { session: any }, res) => {
    if (req.method === "GET") {
      try {
        const verification = {
          message: "Sign into Purple Monkey Chats!",
          id: v4(),
        } as Verification;
        req.session.verification = verification;
        await req.session.save();
        res.json(verification);
      } catch (error) {
        console.log(error);
        res.status(422).send({ message: "Cannot generate message" });
      }
      return res.status(200).end();
    } else if (req.method === "POST") {
      try {
        await addressCheckMiddleware(req, res);
        return res.status(200).send({ message: "Verified signature" });
      } catch (error) {
        return res.status(422).send({ message: "Couldn't create JSON" });
      }
    } else {
      return res.status(400).end();
    }
  }
);
