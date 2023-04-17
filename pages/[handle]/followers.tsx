import useFollow from "@hooks/profile/useFollow";
import Connections from "@ui/Connections/Connections";
import { FunctionComponent } from "react";
import classes from "./FollowersPage.module.css";

const FollowersPage: FunctionComponent = () => {
  const { data, isLoading, isError } = useFollow("followers");
  if (isLoading) {
    return <h1>Loading...</h1>;
  } else if (isError) {
    return <h1>Error</h1>;
  } else if (data) {
    return <Connections users={data} heading="Followers" />;
  }
  return <></>;
};

export default FollowersPage;
