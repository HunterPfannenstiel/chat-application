import { MetaMaskInpageProvider } from "@metamask/providers";
import { Web3Hooks } from "components/hooks/Web3/hookFactory";
import { ethers } from "ethers";

export type Web3 = {
  isLoading: boolean;
  isInstalled: boolean;
  hooks: Web3Hooks;
} & Web3Dependencies;

export type Web3Dependencies = {
  ethereum: MetaMaskInpageProvider | undefined;
  provider: ethers.BrowserProvider | undefined;
};
