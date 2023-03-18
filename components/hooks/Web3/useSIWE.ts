import { signMessage } from "utils/auth/web3";
import { Web3Hook } from "./utils/types";

type UseSIWEResponse = {
  signIn: () => {};
};
type SIWEHookFactory = Web3Hook<UseSIWEResponse>;
export type UseSIWEHook = ReturnType<SIWEHookFactory>;

const useSIWE: SIWEHookFactory =
  ({ ethereum }) =>
  () => {
    return { signIn: signMessage.bind(null, ethereum) };
  };

export default useSIWE;
