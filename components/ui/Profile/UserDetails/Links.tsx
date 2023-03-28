import { FunctionComponent, ReactNode } from "react";
import FollowLink from "./FollowLink";
import classes from "./Links.module.css";

interface LinksProps {
  children: ReactNode;
}

const Links: FunctionComponent<LinksProps> = ({ children }) => {
  return <div className={classes.links}>{children}</div>;
};

export default Links;
