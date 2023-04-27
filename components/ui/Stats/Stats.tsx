import { FunctionComponent } from "react";
import classes from "./Stats.module.css";
import ProfileImage from "@ui/Resuable/Profile/ProfileImage/ProfileImage";
import StatBlock from "@ui/Resuable/StatBlock/StatBlock";
import { useRouter } from "next/router";
import LikeIcon from "@ui/Resuable/Icons/LikeIcon";
import FollowerIcon from "@ui/Resuable/Icons/FollowerIcon";
import CommentIcon from "@ui/Resuable/Icons/CommentIcon";
import UserBlock from "@ui/Resuable/UserBlock/UserBlock";
import { UserDetails } from "@_types/user";
import FollowButton from "@ui/Resuable/FollowButton/FollowButton";
import StatUserBlock from "@ui/Resuable/UserBlock/StatUserBlock/StatUserBlock";

interface StatsProps {
  userDetails: UserDetails;
  likesReceived: number;
  likesGiven: number;
  postsMade: number;
  repliesReceived: number;
  updateFollowerCount: (amount: number, userIndex?: number) => void;
}

const Stats: FunctionComponent<StatsProps> = ({
  userDetails,
  likesReceived,
  likesGiven,
  postsMade,
  repliesReceived,
  updateFollowerCount,
}) => {
  const router = useRouter();

  return (
    <div className={classes.container}>
      <StatUserBlock
        user={userDetails}
        updateFollowerCount={updateFollowerCount}
      />
      <StatBlock
        headings={[
          "Following",
          "Followers",
          "Likes Given",
          "Likes Received",
          "Posts Created",
          "Replies Received",
        ]}
        counts={[
          userDetails.followingCount,
          userDetails.followerCount,
          likesGiven,
          likesReceived,
          postsMade,
          repliesReceived,
        ]}
        imageIcons={[
          <FollowerIcon filled={true} key={1} />,
          <FollowerIcon key={2} />,
          <LikeIcon liked={true} key={3} />,
          <LikeIcon liked={false} key={4} />,
          <CommentIcon filled={true} key={5} />,
          <CommentIcon key={6} />,
        ]}
      />
    </div>
  );
};

export default Stats;
