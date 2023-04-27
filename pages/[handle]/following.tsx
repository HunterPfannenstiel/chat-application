import { FunctionComponent } from "react";
import Connections from "@ui/Connections/Connections";
import useFollow from "@hooks/profile/useFollow";

const FollowingPage: FunctionComponent = () => {
  const { data, setScrollEvent, updateFollowerCount } = useFollow("following");
  if (data) {
    return (
      <Connections
        users={data}
        heading="Following"
        setScrollEvent={setScrollEvent}
        updateFollowerCount={updateFollowerCount}
      />
    );
  }
  return <></>;
};

export default FollowingPage;
