import { FunctionComponent } from "react";
import classes from "./FeedNav.module.css";
import Links from "./Links";
import SearchIcon from "@ui/Resuable/Icons/SearchIcon";
import Link from "next/link";

interface FeedNavProps {}

const FeedNav: FunctionComponent<FeedNavProps> = () => {
  return (
    <>
      <Links />
      <Link href={"/search"}>
        <SearchIcon className={classes.search} />
      </Link>
    </>
  );
};

export default FeedNav;
