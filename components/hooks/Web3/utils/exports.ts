import { useHooks } from "components/providers/Web3/Web3";

export const useAddress = () => {
  const { useAddress } = useHooks();
  return useAddress();
};

export const useNetwork = () => {
  const { useNetwork } = useHooks();
  return useNetwork();
};
