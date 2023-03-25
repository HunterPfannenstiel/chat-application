import { NextApiHandler } from "next";
import jwt from "jsonwebtoken";
import { SigningChallenge } from "@_types/api/verify";
import { verifySignature } from "pages/api/utils";
type SignInError = Error & { statusCode: number | undefined };
const handler: NextApiHandler = async (req, res) => {
  const { provider } = req.query;
  if (req.method === "POST") {
    if (provider === "credentials") {
      const jsonToken = req.cookies["signing-challenge"];
      const { signature, address } = req.body;
      try {
        if (jsonToken) {
          let token;
          try {
            token = jwt.verify(
              jsonToken,
              process.env.JWT_PASSWORD!
            ) as jwt.JwtPayload & SigningChallenge;
          } catch (error: any) {
            console.log("Invalid Token");
            const e = createError("Invalid Signing Challenge", 400);
            throw e;
          }
          if (signature && address) {
            const userAddress = await verifySignature(
              token,
              address,
              signature
            );
            if (userAddress) {
              console.log("Successful Verification");
              return res
                .status(200)
                .json({ id: userAddress, URL: "http://localhost3000/" });
              // return { id: userAddress };
            } else {
              console.log("Invalid Address");
              const e = createError("Invalid Address", 401);
              throw e;
            }
          } else {
            console.log("Credentials are not Complete");
            const e = createError("Credentials are not Complete", 401);
            throw e;
          }
        }
        console.log("No Signing Challenge Provided");
        const e = createError("No Signing Challenge Provided", 401);
        throw e;
      } catch (error: any) {
        if (!error.statusCode) {
          error.statusCode = 500;
        }
        res.status(error.statusCode).json(error.message);
      }

      return res.status(200).send({ message: "success" });
    }
  }
  res.status(405).json({ message: "POST requests only" });
};

const createError = (message: string, statusCode: number) => {
  const error = new Error(message) as SignInError;
  error.statusCode = statusCode;
  return error;
};
export default handler;
