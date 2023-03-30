import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import { NextApiRequest, NextApiResponse } from "next";
import { verifySignature } from "../utils";
import jwt from "jsonwebtoken";
import { SigningChallenge } from "@_types/api/verify";

export default async function auth(req: NextApiRequest, res: NextApiResponse) {
  const providers = [
    CredentialsProvider({
      name: "Web3",
      credentials: {
        signature: {
          label: "Signature",
          type: "text",
          placeholder: "0x0",
        },
        address: {
          label: "Address",
          type: "text",
          placeholder: "0x0",
        },
      },
      async authorize(credentials) {
        const jsonToken = req.cookies["signing-challenge"];
        if (jsonToken) {
          let token;
          try {
            token = jwt.verify(
              jsonToken,
              process.env.JWT_PASSWORD!
            ) as jwt.JwtPayload & SigningChallenge;
          } catch (e: any) {
            console.log("Invalid Token");
            throw new Error(e);
          }
          if (credentials?.signature && credentials?.address) {
            const address = await verifySignature(
              token,
              credentials.address,
              credentials.signature
            );
            if (address) {
              console.log("Successful Verification");
              return { id: address };
            } else {
              console.log("Invalid Address");
              throw new Error("Invalid Address");
            }
          } else {
            console.log("Credentials are not Complete");
            throw new Error("Credentials are not Complete");
          }
        }
        console.log("No Signing Challenge Provided");
        throw new Error("No Signing Challenge Provided");
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      // authorization: {
      //   params: {
      //     prompt: "consent",
      //     access_type: "offline",
      //     response_type: "code",
      //   },
      // },
    }),
  ];

  return NextAuth(req, res, {
    providers,
    session: {
      strategy: "jwt",
    },
    secret: process.env.NEXTAUTH_SECRET,
    callbacks: {
      async session({ session, token }: { session: any; token: any }) {
        session.user.name = token.sub;
        session.user.userId = token.userid;
        console.log("SESSION", session);
        return session;
      },
      async signIn({ account, profile }) {
        if (account?.provider === "google" && profile) {
          if (profile.email_verified) return profile.email_verified;
        }
        return true;
      },
      jwt: async ({ token, account, isNewUser, profile }) => {
        if (account)
          if (account) {
            //Only defined when JWT is created
            if (account.provider === "credentials") {
              token.isWeb3 = true;
              token.userId = await fetchUserId(
                account.providerAccountId,
                false
              );
            } else if (profile && profile.email) {
              token.isWeb3 = false;
              token.userId = await fetchUserId(profile.email, false);
            }
          }
        return token;
      },
    },

    pages: {
      signIn: "/auth/signin",
    },
  });
}

const fetchUserId = async (id: string, isWeb3: boolean) => {
  if (isWeb3) {
    //Id fetch with 'id' being ethereum address
  } else {
    //id fetch with 'id' being email
  }
  return "123TEST";
};

export const authOptions = {};
