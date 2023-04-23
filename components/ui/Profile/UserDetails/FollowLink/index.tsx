import Link from "next/link";
import { FunctionComponent } from "react";
import classes from "./index.module.css";

interface FollowLinkProps {
  href: string;
  count: number;
  label: string;
}

const FollowLink: FunctionComponent<FollowLinkProps> = ({
  href,
  count,
  label,
}) => {
  return (
    <Link href={href} className={classes.link}>
      <p className={classes.text}>
        <span>{count}</span>
        {label}
      </p>
    </Link>
  );
};

export default FollowLink;
