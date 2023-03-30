import type {
  GetServerSidePropsContext,
  InferGetServerSidePropsType,
} from "next";
import { useSIWE } from "components/hooks/Web3/utils/exports";
import { ClientSafeProvider, getProviders, signIn } from "next-auth/react";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../api/auth/[...nextauth]";

export default function SignIn({
  providers,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const { signIn: SIWE } = useSIWE();
  const signInHandler = (provider: ClientSafeProvider) => {
    console.log(provider);
    if (provider.name === "Web3") {
      SIWE();
    } else {
      signIn(provider.id);
    }
  };
  return (
    <>
      {Object.values(providers).map((provider) => (
        <div key={provider.name}>
          <button onClick={signInHandler.bind(null, provider)}>
            Sign in with {provider.name}
          </button>
        </div>
      ))}
    </>
  );
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const session = await getServerSession(context.req, context.res, authOptions);
  console.log("SESSION", session);
  // If the user is already logged in, redirect.
  // Note: Make sure not to redirect to the same page
  // To avoid an infinite loop!
  if (session) {
    return { redirect: { destination: "/" } };
  }

  const providers = await getProviders();

  return {
    props: { providers: providers ?? [] },
  };
}
