import { v4 } from "uuid";
import withSession, { verifySignature } from "./utils";
import jwt from "jsonwebtoken";
import { NextApiRequest } from "next";
import { SigningChallenge } from "@_types/api/verify";
import { setCookie } from "./utils";

const BASE_MESSAGE = "Sign into Purple Monkey Chats!";
export default withSession(
  async (req: NextApiRequest & { session: any }, res) => {
    if (req.method === "GET") {
      try {
        const id = v4();
        const verification = {
          message:
            "Sign into Purple Monkey Chats!" + " One time use code: " + id,
          id,
        } as SigningChallenge;
        const token = jwt.sign(verification, process.env.JWT_PASSWORD!, {
          expiresIn: 120,
        });
        setCookie(res, "signing-challenge", token, { maxAge: 120 });
        res.json(verification);
      } catch (error) {
        console.log(error);
        res.status(422).send({ message: "Cannot generate message" });
      }
      return res.status(200).end();

      // } else if (req.method === "POST") {
      //   try {
      //     await addressCheckMiddleware(req, res);
      //     return res.status(200).send({ message: "Verified signature" });
      //   } catch (error) {
      //     return res.status(422).send({ message: "Couldn't create JSON" });
      //   }
    } else {
      return res.status(400).end();
    }
  }
);
