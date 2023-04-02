import { FunctionComponent } from "react";
import classes from "./SignIn.module.css";
import { ClientSafeProvider, LiteralUnion } from "next-auth/react/types";
import { BuiltInProviderType } from "next-auth/providers";
import { useSIWE } from "@hooks/Web3/utils/exports";
import { signIn } from "next-auth/react";

interface SignInProps {
  providers:
    | Record<LiteralUnion<BuiltInProviderType, string>, ClientSafeProvider>
    | never[];
}

const SignIn: FunctionComponent<SignInProps> = ({ providers }) => {
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
    <section className={classes.sign_in}>
      <h1 className={classes.title}>LOGIN</h1>
      {Object.values(providers).map((provider) => (
        <div key={provider.name}>
          <button
            onClick={signInHandler.bind(null, provider)}
            className={classes.button}
          >
            Sign in with {provider.name}
          </button>
        </div>
      ))}
    </section>
  );
};

export default SignIn;
