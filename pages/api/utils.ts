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

type SignInError = Error & {
  statusCode: number | undefined;
  redirect: Function | undefined;
};
export const createError = (
  message: string,
  statusCode: number,
  redirect?: Function
) => {
  const error = new Error(message) as SignInError;
  error.statusCode = statusCode;
  error.redirect = redirect;
  return error;
};

export const sendErrorResponse = (error: any, res: NextApiResponse) => {
  if (!error.statusCode) error.statusCode = 500;
  return res.status(error.statusCode).json(error.message);
};

export const parseImage = async (
  req: any,
  res: any,
  imageParser: any,
  single: boolean
) => {
  await new Promise<void>((resolve, reject) => {
    imageParser(req, res, (err: any) => {
      if (err) {
        reject(new Error(err.message));
      }
      resolve();
    });
  });
  if (single) return req.file;
  return req.files;
};

export const getUserSession = async (
  req: NextApiRequest,
  res: NextApiResponse,
  throwErr?: boolean
) => {
  const session = (await getSession({ req })) as SessionToken | null;
  console.log("Throw err", throwErr);
  if (!session && throwErr) {
    console.log("Session throw err");
    const e = createError("Please sign-in!", 400, () => {
      console.log("INVOKE");
      return res.redirect("/auth/signup");
      // res.writeHead(307, { Location: "/auth/signin" });
      // res.end();
    });
    throw e;
  } else if (!session?.user.userId && throwErr) {
    console.log("Userid throw err");
    const e = createError(
      "Account not created, please create an account!",
      400,
      () => {
        return res.redirect("/auth/signup");
        console.log("INVOKE");
        // res.writeHead(307, { Location: "/auth/signup" });
        // res.end();
      }
    );
    throw e;
  }
  return session;
};

export const defaultUser = {
  userHandle: "defaultuser",
  userName: "DefaultUser",
  userImage:
    "https://res.cloudinary.com/dwg1i9w2u/image/upload/v1682219857/DefaultUser_ou2hrg.jpg",
  followerCount: 0,
  followingCount: 0,
  userId: 0,
  isSignedIn: false,
};
