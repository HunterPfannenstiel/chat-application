import { NextApiHandler } from "next";
import { createError } from "../utils";
import { isValidHandle } from "utils/db/user-commands";
const handler: NextApiHandler = async (req, res) => {
  try {
    if (req.method === "GET") {
      const handle = req.query.handle;
      if (!handle || typeof handle !== "string") {
        const e = createError("Please enter a handle", 400);
        throw e;
      }
      const isValid = await isValidHandle(handle);
      res.status(200).json({ isValidHandle: isValid === 1 });
    } else {
      return res.status(400).json({ message: "Invalid method" });
    }
  } catch (error: any) {
    if (!error.statusCode) error.statusCode = 500;
    return res.status(error.statusCode).json({ message: error.message });
  }
};
export default handler;
