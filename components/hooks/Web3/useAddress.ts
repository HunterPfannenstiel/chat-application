import { useEffect, useState } from "react";
import { Web3Hook } from "./utils/types";

type UseAddressResponse = {
  connectWallet: () => void;
  address: string;
};
type AddressHookFactory = Web3Hook<UseAddressResponse>;
export type UseAddressHook = ReturnType<AddressHookFactory>;

const useAddress: AddressHookFactory =
  ({ ethereum, provider }) =>
  () => {
    // const [address, setAddress] = useState("");
    // const handleAccountsChanged = (...args: any[]) => {
    //   const accounts = args[0] as string[];
    //   if (accounts.length === 0) {
    //     console.log("Wallet disconnected");
    //   } else {
    //     console.log("Found wallet", accounts[0]);
    //     setAddress(accounts[0]);
    //   }
    // };

    // useEffect(() => {
    //   ethereum?.on("accountsChanged", handleAccountsChanged);
    //   return () => {
    //     ethereum?.removeListener("accountsChanged", handleAccountsChanged);
    //   };
    // });

    // useEffect(() => {
    //   provider
    //     ?.listAccounts()
    //     .then((accounts) => setAddress(accounts[0]?.address || ""));
    // }, [provider]);

    // const connectWallet = async () => {
    //   try {
    //     console.log(ethereum);
    //     ethereum?.request({ method: "eth_requestAccounts" });
    //   } catch (e) {
    //     console.log(e);
    //   }
    // };
    return {
      connectWallet: () => {
        return;
      },
      address: "1",
    };
  };

export default useAddress;
