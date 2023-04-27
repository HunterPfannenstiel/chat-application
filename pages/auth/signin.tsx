import type {
  GetServerSidePropsContext,
  InferGetServerSidePropsType,
} from "next";
import { useSIWE } from "components/hooks/Web3/utils/exports";
import SignInPage from "@ui/SignIn/SignIn";
import {
  ClientSafeProvider,
  getProviders,
  getSession,
  signIn,
} from "next-auth/react";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../api/auth/[...nextauth]";
import { SessionToken } from "@_types/auth";
import MetaMaskIcon from "@ui/Resuable/Icons/MetaMaskIcon";
import GmailIcon from "@ui/Resuable/Icons/GmailIcon";

export default function SignIn({
  providers,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return (
    <SignInPage
      providers={providers}
      icons={[<MetaMaskIcon key={1} />, <GmailIcon key={2} />]}
    />
  );
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  // const session = (await getServerSession(
  //   context.req,
  //   context.res,
  //   authOptions
  // )) as SessionToken;
  const session = (await getSession({
    req: context.req,
  })) as SessionToken | null;
  if (session) {
    if (session.user.isNew && !session.user.userId) {
      //User signed in and needs to create account
      return { redirect: { destination: "/auth/signup" } };
    }
    return { redirect: { destination: "/" } };
  }

  const providers = await getProviders();

  return {
    props: { providers: providers ?? [] },
  };
}
