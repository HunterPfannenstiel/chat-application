import { MetaMaskInpageProvider } from "@metamask/providers/dist/MetaMaskInpageProvider";
import { SigningChallenge } from "@_types/api/verify";
import { signIn } from "next-auth/react";

export const signMessage = async (
  ethereum: MetaMaskInpageProvider | undefined
) => {
  const accounts = (await ethereum?.request({
    method: "eth_requestAccounts",
  })) as string[] | undefined; //If user is not signed in, we'll request account and get the account that needs to sign
  if (accounts) {
    const res = await fetch("/api/verify");
    if (res.ok) {
      const verifcation = (await res.json()) as SigningChallenge;
      const account = accounts[0];
      const signedData = await ethereum?.request({
        method: "personal_sign",
        params: [verifcation.message, account, verifcation.id],
      });
      // await fetch("/api/verify", {
      //   method: "POST",
      //   body: JSON.stringify({ address: account, signature: signedData }),
      //   headers: { "Content-Type": "application/json" },
      // });
      const result = await signIn("credentials", {
        redirect: true,
        signature: signedData,
        address: account,
      });
      console.log("RESULT", result);
    }
  }
};
