import { FunctionComponent } from "react";
import classes from "./StatsPage.module.css";
import Stats from "@ui/Stats/Stats";
import { UserDetails } from "@_types/user";
import useStats from "@hooks/stats/useStats";

interface StatsPageProps {}

const StatsPage: FunctionComponent<StatsPageProps> = () => {
  const { data } = useStats();
  if (!data) {
    return <>Loading</>;
  } else {
    console.log(data);
    return (
      <Stats
        userDetails={{
          userHandle: data.userHandle,
          userName: data.userName,
          userImage: data.userImage,
          userId: data.userId,
          followerCount: data.followerCount,
          followingCount: data.followingCount,
          isFollowing: data.isFollowing,
        }}
        likesGiven={data.likesGiven}
        likesReceived={data.likesReceived}
        postsMade={data.postsMade}
        repliesReceived={data.repliesReceived}
      />
    );
  }
};

export default StatsPage;
