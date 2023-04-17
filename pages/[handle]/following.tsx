import { FunctionComponent } from "react";
import Connections from "@ui/Connections/Connections";
import useFollow from "@hooks/profile/useFollow";

const FollowingPage: FunctionComponent = () => {
  const { data, isLoading, isError } = useFollow("following");
  if (isLoading) {
    return <h1>Loading...</h1>;
  } else if (isError) {
    return <h1>Error</h1>;
  } else if (data) {
    return <Connections users={data} heading="Following" />;
  }
  return <></>;
};

export default FollowingPage;
