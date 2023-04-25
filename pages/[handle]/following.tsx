import { FunctionComponent } from "react";
import Connections from "@ui/Connections/Connections";
import useFollow from "@hooks/profile/useFollow";

const FollowingPage: FunctionComponent = () => {
  const { data } = useFollow("following");
  if (data) {
    return <Connections users={data} heading="Following" />;
  }
  return <></>;
};

export default FollowingPage;
