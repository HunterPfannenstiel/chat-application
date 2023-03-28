import "../styles/globals.css";
import type { AppProps } from "next/app";
import Web3Provider from "components/providers/Web3/Web3";
import { SessionProvider } from "next-auth/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <Web3Provider>
        <SessionProvider>
          <Component {...pageProps} />
        </SessionProvider>
      </Web3Provider>
    </QueryClientProvider>
  );
}

export default MyApp;
