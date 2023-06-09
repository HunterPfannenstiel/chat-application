import { FunctionComponent } from "react";
import classes from "./StatsPage.module.css";
import Stats from "@ui/Stats/Stats";
import { UserDetails } from "@_types/user";
import useStats from "@hooks/stats/useStats";

interface StatsPageProps {}

const StatsPage: FunctionComponent<StatsPageProps> = () => {
  const { data, updateFollowerCount } = useStats();
  if (!data) {
    return <></>;
  } else {
    return (
      <Stats
        updateFollowerCount={updateFollowerCount}
        userDetails={{
          userHandle: data.userHandle,
          userName: data.userName,
          userImage: data.userImage,
          userId: data.userId,
          followerCount: data.followerCount,
          followingCount: data.followingCount,
          isFollowing: data.isFollowing,
          bio: data.bio,
        }}
        likesGiven={data.likesGiven}
        likesReceived={data.likesReceived}
        postsMade={data.postsCreated}
        repliesReceived={data.repliesReceived}
      />
    );
  }
};

export default StatsPage;
