import "../styles/globals.css";
import type { AppProps } from "next/app";
import Web3Provider from "components/providers/Web3/Web3";
import { SessionProvider } from "next-auth/react";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Web3Provider>
      <SessionProvider>
        <Component {...pageProps} />
      </SessionProvider>
    </Web3Provider>
  );
}

export default MyApp;
