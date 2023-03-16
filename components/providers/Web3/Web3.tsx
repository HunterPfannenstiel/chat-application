import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { Web3 } from "./types";
import { initializeWeb3, getInitialContext } from "./utils";
import { FunctionComponent } from "react";
import { BrowserProvider } from "ethers/types/providers/provider-browser";
import { MetaMaskInpageProvider } from "@metamask/providers";
import { initializeHooks, Web3Hooks } from "components/hooks/Web3/hookFactory";

const pageReload = () => {
  window.location.reload();
};

const setGlobalListeners = () => {
  window.ethereum.on("chainChanged", pageReload);
};

const removeGlobalListeners = () => {
  window.ethereum.removeListener("chainChanged", pageReload);
};

const Web3 = createContext<Web3>(getInitialContext());

const Web3Provider: FunctionComponent<{ children: ReactNode }> = ({
  children,
}) => {
  const [provider, setProvider] = useState<BrowserProvider>();
  const [ethereum, setEthereum] = useState<MetaMaskInpageProvider>();
  const [hooks, setHooks] = useState<Web3Hooks>(
    initializeHooks({ ethereum: undefined, provider: undefined })
  );

  useEffect(() => {
    const {provider, ethereum, hooks} = initializeWeb3();
    setProvider(provider);
    setEthereum(ethereum);
    setHooks(hooks);
    if (window.ethereum) {
      setGlobalListeners();
    }

    return removeGlobalListeners;
  }, []);

  return (
    <Web3.Provider
      value={{ provider, ethereum, hooks, isInstalled: true, isLoading: false }}
    >
      {children}
    </Web3.Provider>
  );
};

export default Web3Provider;

export const useWeb3 = () => {
  return useContext(Web3);
};

export const useHooks = () => {
  const { hooks } = useWeb3();
  return hooks;
};
