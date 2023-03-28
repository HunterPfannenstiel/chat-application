import Link from "next/link";
import { FunctionComponent } from "react";
import classes from "./index.module.css";

interface FollowLinkProps {
  userName: string;
  param: "followers" | "following";
  count: number;
  text: string;
}

const FollowLink: FunctionComponent<FollowLinkProps> = ({
  userName,
  param,
  count,
  text,
}) => {
  return (
    <Link href={`/${userName}/${param}`} className={classes.link}>
      <p className={classes.text}>
        {count}
        <span>{text}</span>
      </p>
    </Link>
  );
};

export default FollowLink;
