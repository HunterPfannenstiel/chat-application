import Link from "next/link";
import { FunctionComponent } from "react";
import classes from "./index.module.css";

interface FollowLinkProps {
  href: string;
  count: number;
  label: string;
  asPath?: string;
}

const FollowLink: FunctionComponent<FollowLinkProps> = ({
  href,
  count,
  label,
  asPath,
}) => {
  const selected = asPath === href;
  return (
    <Link
      href={href}
      className={`${classes.link} ${selected ? classes.selected : ""}`}
    >
      <p className={classes.text}>
        <span>{count}</span>
        {label}
      </p>
    </Link>
  );
};

export default FollowLink;
