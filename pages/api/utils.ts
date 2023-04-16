import { withIronSessionApiRoute } from "iron-session/next";
import { NextApiRequest, NextApiResponse } from "next";
import { serialize, CookieSerializeOptions } from "cookie";
import * as util from "ethereumjs-util";
import { SigningChallenge } from "@_types/api/verify";
import { getSession } from "next-auth/react";
import { SessionToken } from "@_types/auth";

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

    if (addr === address) {
      return address;
    } else {
      console.log("User does not own the address provided!");
      return null;
    }
  } else {
    console.log("Address or signature not provided");
    return null;
  }
};

type SignInError = Error & { statusCode: number | undefined };
export const createError = (message: string, statusCode: number) => {
  const error = new Error(message) as SignInError;
  error.statusCode = statusCode;
  return error;
};

export const sendErrorResponse = (error: any, res: NextApiResponse) => {
  if (!error.statusCode) error.statusCode = 500;
  return res.status(error.statusCode).json(error.message);
};

export const parseImage = (req: any, res: any, imageParser: any) => {
  return new Promise<void>((resolve, reject) => {
    imageParser(req, res, (err: any) => {
      if (err) {
        reject(new Error(err.message));
      }
      resolve();
    });
  });
};

export const getUserSession = async (req: NextApiRequest) => {
  const session = (await getSession({ req })) as SessionToken | null;
  if (!session) {
    const e = createError("Please sign-in!", 400);
    throw e;
  }
  if (!session.user.userId) {
    const e = createError(
      "Account not created, please create an account!",
      400
    );
    throw e;
  }
  return session.user.userId;
};
