import { useAddress, useNetwork } from "components/hooks/Web3/utils/exports";
import type { NextPage } from "next";
import styles from "../styles/Home.module.css";
import HomeFeed from "@ui/HomeFeed/HomeFeed";
import useFeed from "@hooks/profile/useFeed";

const Home: NextPage = () => {
  const { connectWallet, address } = useAddress();
  const { network } = useNetwork();
  const { feed, isLoading, isError } = useFeed();
  if (isLoading) {
    return <h1>Loading...</h1>;
  } else if (isError) {
    return <h1>An error has occurred</h1>;
  } else if (feed) {
    return <HomeFeed user={feed.user} isSignedIn={feed.isSignedIn} />;
  }
  return <p>Invalid state</p>;
};

export default Home;
