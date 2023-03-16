import { Web3Dependencies } from "components/providers/Web3/types";

export type Web3Hook<U> = (dep: Web3Dependencies) => () => U;
