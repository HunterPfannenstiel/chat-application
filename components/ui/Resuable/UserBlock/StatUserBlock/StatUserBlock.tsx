import { FunctionComponent, ReactNode } from "react";
import classes from "./StatUserBlock.module.css";
import { UserDetails } from "@_types/user";
import ProfileImage from "@ui/Resuable/Profile/ProfileImage/ProfileImage";
import router from "next/router";
import UserBlockButton from "../UserBlockButton";
import FollowerIcon from "@ui/Resuable/Icons/FollowerIcon";
import FollowButton from "@ui/Resuable/FollowButton/FollowButton";

interface StatUserBlockProps {
  user: UserDetails;
  buttonText?: string;
  button?: ReactNode;
  updateFollowerCount: (amount: number, userIndex?: number) => void;
}

const StatUserBlock: FunctionComponent<StatUserBlockProps> = ({
  user,
  updateFollowerCount,
  buttonText,
  button,
}) => {
  console.log(user);
  return (
    <div className={classes["user-block"]}>
      <div className={classes["pfp-name-container"]}>
        <ProfileImage
          src={user.userImage}
          circleDiameter="2rem"
          onClick={() => {
            router.push(`/${user.userHandle}`);
          }}
        />
        <div className={classes.name}>
          <p>{user.userName}</p>
          <p>{`@${user.userHandle}`}</p>
        </div>
        <FollowButton
          handle={user.userHandle}
          updateFollowerCount={updateFollowerCount}
          isFollowing={user.isFollowing || false}
          userId={user.userId!}
        />
      </div>
      <p>{user.bio}</p>
    </div>
  );
};

export default StatUserBlock;
