import "../styles/globals.css";
import type { AppProps } from "next/app";
import Web3Provider from "components/providers/Web3/Web3";
import { SessionProvider } from "next-auth/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import UserProvider from "components/providers/User/User";
import MainNav from "@ui/MainNav/MainNav";
import SearchProvider from "components/providers/Search/Search";
import LoadingProvider from "components/providers/Loading/Loading";

const queryClient = new QueryClient({
  defaultOptions: { queries: { refetchOnWindowFocus: false } },
});

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <Web3Provider>
        <SessionProvider>
          <UserProvider>
            <SearchProvider>
              <LoadingProvider>
                <MainNav>
                  <Component {...pageProps} />
                </MainNav>
              </LoadingProvider>
            </SearchProvider>
          </UserProvider>
        </SessionProvider>
      </Web3Provider>
    </QueryClientProvider>
  );
}

export default MyApp;
