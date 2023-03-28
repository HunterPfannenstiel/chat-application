import { FunctionComponent, ReactNode } from "react";
import FollowLink from "./FollowLink";
import classes from "./index.module.css";
import Links from "./Links";

interface UserDetailsProps {
  children: ReactNode;
}

const UserDetails: FunctionComponent<UserDetailsProps> = ({ children }) => {
  return <div className={classes.details}>{children}</div>;
};

export default UserDetails;
