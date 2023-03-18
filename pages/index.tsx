import { useAddress, useNetwork } from "components/hooks/Web3/utils/exports";
import type { NextPage } from "next";
import styles from "../styles/Home.module.css";

const Home: NextPage = () => {
  const { connectWallet, address } = useAddress();
  const { network } = useNetwork();
  return (
    <>
      <button onClick={connectWallet}>Connect</button>
      <p>{address}</p>
      <p>{network}</p>
      <h1>ETHER</h1>
    </>
  );
};

export default Home;
