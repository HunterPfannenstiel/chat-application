import { Web3 } from "./types";
import { MetaMaskInpageProvider } from "@metamask/providers";
import { BrowserProvider } from "ethers";
import { initializeHooks } from "components/hooks/Web3/hookFactory";

declare global {
  interface Window {
    ethereum: MetaMaskInpageProvider;
  }
}

export const getInitialContext = (): Web3 => {
  return {
    ethereum: undefined,
    provider: undefined,
    isLoading: true,
    isInstalled: true,
    hooks: initializeHooks({ ethereum: undefined, provider: undefined }),
  };
};

export const initializeWeb3 = (): Web3 => {
  const ethereum = window.ethereum;
  const provider = new BrowserProvider(ethereum);
  return {
    ethereum,
    provider,
    isLoading: false,
    isInstalled: true,
    hooks: initializeHooks({ ethereum, provider }),
  };
};
