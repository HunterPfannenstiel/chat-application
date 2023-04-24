import { FunctionComponent, useState } from "react";
import classes from "./FollowButton.module.css";
import { updateFollowing } from "utils/actions";
import PurpleButton from "../Icons/PurpleButton";

interface FollowButtonProps {
  isFollowing: boolean;
  userId: number;
}

const FollowButton: FunctionComponent<FollowButtonProps> = ({
  isFollowing,
  userId,
}) => {
  const [following, setFollowing] = useState(isFollowing);
  const buttonText = following ? "Unfollow" : "Follow";
  const handleButtonClick = () => {
    if (following) updateFollowing(userId, "unfollow");
    else updateFollowing(userId, "follow");

    setFollowing((prevState) => !prevState);
  };
  return (
    <PurpleButton onClick={handleButtonClick} className={classes.button}>
      {buttonText}
    </PurpleButton>
  );
};

export default FollowButton;
