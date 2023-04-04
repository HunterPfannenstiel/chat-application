import { NextApiHandler } from "next";
import multer from "multer";
import { sendErrorResponse } from "../utils";
import { User } from "models/User";
import { getSession } from "next-auth/react";
import { SessionToken } from "@_types/auth";

let imageParser = multer({
  fileFilter: (req, file, cb) => {
    console.log("Mime called");
    if (file.mimetype.startsWith("image/")) {
      cb(null, true);
    } else {
      cb(null, false);
    }
  },
}).single("image");

export const config = {
  api: {
    bodyParser: false,
  },
};
const handler: NextApiHandler = (req, res) => {
  if (req.method === "POST") {
    try {
      imageParser(req as any, res as any, async (err) => {
        if (!err) {
          const session = (await getSession({ req })) as SessionToken | null;
          if (!session) {
            throw new Error("Please sign-in before creating an account!");
          }
          if (!session.user.isNew) {
            throw new Error("Account already exists!");
          }
          const { name, handle, bio } = req.body;
          console.log("INFO", { name, handle, bio });
          console.log("FILE", req.file);
          const userId = await User.create({
            userHandle: handle,
            userImage: "test",
            userName: name,
            bio,
            email: !session.user.isWeb3 ? session.user.name : undefined,
            ethereumAddress: session.user.isWeb3
              ? session.user.name
              : undefined,
          });
          res.status(200).json({ message: "uploaded user", id: userId });
        }
      });
    } catch (error) {
      return sendErrorResponse(error, res);
    }
  } else {
    return res.status(400).json({ message: "Invalid method" });
  }
};
export default handler;
