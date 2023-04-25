import { FunctionComponent, useState } from "react";
import classes from "./FollowButton.module.css";
import PurpleButton from "../Icons/PurpleButton";
import { useUserDetails } from "components/providers/User/User";
import { updateFollowing as dispatchFollowing } from "components/providers/User/utils";
import { updateFollowing } from "utils/actions";

interface FollowButtonProps {
  isFollowing: boolean;
  userId: number;
}

const FollowButton: FunctionComponent<FollowButtonProps> = ({
  isFollowing,
  userId,
}) => {
  const { dispatchUser } = useUserDetails();
  const [following, setFollowing] = useState(isFollowing);
  const buttonText = following ? "Unfollow" : "Follow";
  const handleButtonClick = () => {
    let val = 1;
    if (following) {
      updateFollowing(userId, "unfollow");
      val = -1;
    } else updateFollowing(userId, "follow");

    setFollowing((prevState) => !prevState);
    dispatchUser(dispatchFollowing(val));
  };
  return (
    <PurpleButton onClick={handleButtonClick} className={classes.button}>
      {buttonText}
    </PurpleButton>
  );
};

export default FollowButton;
