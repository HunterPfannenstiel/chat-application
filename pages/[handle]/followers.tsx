import useFollow from "@hooks/profile/useFollow";
import Connections from "@ui/Connections/Connections";
import { FunctionComponent } from "react";
import classes from "./FollowersPage.module.css";

const FollowersPage: FunctionComponent = () => {
  const { data } = useFollow("followers");
  if (data) {
    return <Connections users={data} heading="Followers" />;
  }
  return <></>;
};

export default FollowersPage;
