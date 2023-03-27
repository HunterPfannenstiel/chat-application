import { v4 } from "uuid";
import jwt from "jsonwebtoken";
import { NextApiHandler } from "next";
import { SigningChallenge } from "@_types/api/verify";
import { setCookie } from "./utils";

const BASE_MESSAGE = "Sign into Purple Monkey Chats!";
const handler: NextApiHandler = async (req, res) => {
  if (req.method === "GET") {
    try {
      const id = v4();
      const verification = {
        message: BASE_MESSAGE + " One time use code: " + id,
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
  } else {
    return res.status(400).end();
  }
};

export default handler;
