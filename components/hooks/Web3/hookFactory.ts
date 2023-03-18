import { Web3Dependencies } from "components/providers/Web3/types";
import addressHook, { UseAddressHook } from "./useAddress";
import networkHook, { UseNetworkHook } from "./useNetwork";
import swieHook, { UseSIWEHook } from "./useSIWE";

export type Web3Hooks = {
  useAddress: UseAddressHook;
  useNetwork: UseNetworkHook;
  useSIWE: UseSIWEHook;
};

export const initializeHooks = (web3: Web3Dependencies): Web3Hooks => {
  return {
    useAddress: addressHook(web3),
    useNetwork: networkHook(web3),
    useSIWE: swieHook(web3),
  };
};
