import { FunctionComponent, useState } from "react";
import classes from "./FollowButton.module.css";
import { updateFollowing } from "utils/actions";

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
    <button onClick={handleButtonClick} className={classes.button}>
      {buttonText}
    </button>
  );
};

export default FollowButton;
