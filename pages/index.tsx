import { useAddress, useNetwork } from "components/hooks/Web3/utils/exports";
import type { NextPage } from "next";
import styles from "../styles/Home.module.css";
import HomeFeed from "@ui/HomeFeed/HomeFeed";
import useFeed from "@hooks/profile/useFeed";

const Home: NextPage = () => {
  const { connectWallet, address } = useAddress();
  const { network } = useNetwork();
  const { posts, setScrollEvent } = useFeed();
  return <HomeFeed posts={posts} setScrollEvent={setScrollEvent} />;
};

export default Home;
