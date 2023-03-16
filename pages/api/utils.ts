import { withIronSessionApiRoute } from "iron-session/next";
import { NextApiRequest, NextApiResponse } from "next";
import * as util from "ethereumjs-util";
import { Verification } from "@_types/api/verify";

declare module "iron-session" {
  interface IronSessionData {
    verification?: Verification;
    isVerified?: boolean;
  }
}

export const cookieSettings = {
  password: process.env.SECRET_COOKIE_PASSWORD!,
  cookieName: "account-auth-session",
  cookieOptions: { secure: process.env.NODE_ENV === "production" },
};

export default function withSession(
  handler: (req: NextApiRequest, res: NextApiResponse) => any
) {
  return withIronSessionApiRoute(handler, cookieSettings);
}

export const addressCheckMiddleware = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  return new Promise((resolve, reject) => {
    const verification = req.session.verification;
    if (verification) {
      const { address, signature } = req.body;
      if (address && signature) {
        let nonce: string | Buffer =
          "\x19Ethereum Signed Message:\n" +
          verification.message.length +
          verification.message;

        nonce = util.keccak(Buffer.from(nonce, "utf-8"));
        const { v, r, s } = util.fromRpcSig(signature);
        const pubKey = util.ecrecover(util.toBuffer(nonce), v, r, s);
        const addrBuffer = util.publicToAddress(pubKey);
        const addr = util.bufferToHex(addrBuffer);

        console.log(addr);
        console.log("Nonce", nonce);
        if (addr === address) {
          req.session.isVerified = true; //Fetch db for user address and set 'user'
          req.session.save();
          resolve("Verified");
        } else {
          reject("Wrong Address");
        }
      } else {
        reject("Invalid request body.");
      }
    } else {
      reject("Invalid Cookie. Please sign in again!");
    }
  });
};
