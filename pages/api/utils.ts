import { withIronSessionApiRoute } from "iron-session/next";
import { NextApiRequest, NextApiResponse } from "next";
import { serialize, CookieSerializeOptions } from "cookie";
import * as util from "ethereumjs-util";
import { SigningChallenge } from "@_types/api/verify";

declare module "iron-session" {
  interface IronSessionData {
    verification?: SigningChallenge;
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
export const setCookie = (
  res: NextApiResponse,
  name: string,
  value: unknown,
  options: CookieSerializeOptions = {}
) => {
  const stringValue =
    typeof value === "object" ? "j:" + JSON.stringify(value) : String(value);

  if (typeof options.maxAge === "number") {
    options.expires = new Date(Date.now() + options.maxAge * 1000);
  }
  res.setHeader("Set-Cookie", serialize(name, stringValue, options));
};

// export const addressCheckMiddleware = async (
//   req: NextApiRequest,
//   res: NextApiResponse
// ) => {
//   return new Promise((resolve, reject) => {
//     const verification = req.session.verification;
//     console.log("VERIFICATION", verification);
//     if (verification) {
//       const { address, signature } = req.body;
//       if (address && signature) {
//         let nonce: string | Buffer =
//           "\x19Ethereum Signed Message:\n" +
//           verification.message.length +
//           verification.message;

//         nonce = util.keccak(Buffer.from(nonce, "utf-8"));
//         const { v, r, s } = util.fromRpcSig(signature);
//         const pubKey = util.ecrecover(util.toBuffer(nonce), v, r, s);
//         const addrBuffer = util.publicToAddress(pubKey);
//         const addr = util.bufferToHex(addrBuffer);

//         console.log(addr);
//         console.log("Nonce", nonce);
//         if (addr === address) {
//           req.session.isVerified = true; //Fetch db for user address and set 'user'
//           req.session.save();
//           resolve(address);
//         } else {
//           reject("Wrong Address");
//         }
//       } else {
//         reject("Invalid request body.");
//       }
//     } else {
//       reject("Invalid Cookie. Please sign in again!");
//     }
//   });
// };

export const verifySignature = async (
  verification: SigningChallenge,
  address: string,
  signature: string
) => {
  console.log("VERIFICATION", verification);
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
      return address;
    } else {
      console.log("Address do not match");
      return null;
    }
  } else {
    console.log("Address or signature not provided");
    return null;
  }
};
