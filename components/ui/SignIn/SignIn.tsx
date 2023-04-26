import { FunctionComponent, ReactNode } from "react";
import classes from "./SignIn.module.css";
import { ClientSafeProvider, LiteralUnion } from "next-auth/react/types";
import { BuiltInProviderType } from "next-auth/providers";
import { useSIWE } from "@hooks/Web3/utils/exports";
import { signIn } from "next-auth/react";
import MetaMaskIcon from "@ui/Resuable/Icons/MetaMaskIcon";

interface SignInProps {
  providers:
    | Record<LiteralUnion<BuiltInProviderType, string>, ClientSafeProvider>
    | never[];
  icons?: ReactNode[];
}

const SignIn: FunctionComponent<SignInProps> = ({ providers, icons }) => {
  const { signIn: SIWE } = useSIWE();
  const signInHandler = (provider: ClientSafeProvider) => {
    if (provider.name === "Web3") {
      SIWE();
    } else {
      signIn(provider.id);
    }
  };
  return (
    <section className={classes.sign_in}>
      <h1 className={classes.title}>SIGN IN</h1>
      {Object.values(providers).map((provider, i) => (
        <div key={provider.name}>
          <button
            onClick={signInHandler.bind(null, provider)}
            className={classes.button}
          >
            <div>
              <p>Sign in with {provider.name}</p>
            </div>
            {icons && icons?.length > i && icons[i]}
          </button>
        </div>
      ))}
    </section>
  );
};

export default SignIn;
