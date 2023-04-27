import { useEffect, useState } from "react";
import { Web3Hook } from "./utils/types";
import { ethers } from "ethers";

type UseNetworkResponse = {
  network: string;
};

type NetworkHookFactory = Web3Hook<UseNetworkResponse>;

export type UseNetworkHook = ReturnType<NetworkHookFactory>;
const useNetwork: NetworkHookFactory =
  ({ provider }) =>
  () => {
    // const [network, setNetwork] = useState("");
    const setNetwork = (...any: any) => {};
    // useEffect(() => {
    //   provider
    //     ?.getNetwork()
    //     .then((netw) => setNetwork(ethers.getNumber(netw.chainId).toString()));
    // }, [provider]);
    return { network: "1" };
  };

export default useNetwork;
