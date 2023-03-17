import { SigningChallenge } from "@_types/api/verify";
import { useAddress, useNetwork } from "components/hooks/Web3/utils/exports";
import { useWeb3 } from "components/providers/Web3/Web3";
import type { NextPage } from "next";
import { signIn } from "next-auth/react";
import { useEffect, useState } from "react";
import styles from "../styles/Home.module.css";

const Home: NextPage = () => {
  const { ethereum } = useWeb3();
  const { connectWallet, address } = useAddress();
  const { network } = useNetwork();

  const signMessage = async () => {
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
          redirect: false,
          signature: signedData,
          address: account,
        });
        console.log("RESULT", result);
      }
    }
  };

  // useEffect(() => {
  //   let controller = new AbortController();
  //   fetch("/api/verify", { signal: controller.signal })
  //     .then((res) => res.json())
  //     .then((messageToSign) => {
  //       console.log(messageToSign);
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  //   return () => {
  //     controller?.abort();
  //   };
  // }, []);
  return (
    <>
      <button onClick={connectWallet}>Connect</button>
      <p>{address}</p>
      <p>{network}</p>
      <button onClick={signMessage}>Sign In</button>
      <h1>ETHER</h1>
    </>
  );
};

export default Home;
