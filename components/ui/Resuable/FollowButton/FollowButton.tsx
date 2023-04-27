import { FunctionComponent, useEffect, useState } from "react";
import classes from "./FollowButton.module.css";
import PurpleButton from "../Icons/PurpleButton";
import { useUserDetails } from "components/providers/User/User";
import { updateFollowing as dispatchFollowing } from "components/providers/User/utils";
import { updateFollowing } from "utils/actions";

interface FollowButtonProps {
  isFollowing: boolean;
  userId: number;
  handle: string;
  updateFollowerCount: (amount: number, userIndex?: number) => void;
  index?: number;
}

const FollowButton: FunctionComponent<FollowButtonProps> = ({
  isFollowing,
  userId,
  handle,
  updateFollowerCount,
  index,
}) => {
  const { dispatchUser, emitFollowAction, followUserAction } = useUserDetails();
  const [following, setFollowing] = useState(isFollowing);
  const buttonText = following ? "Unfollow" : "Follow";
  useEffect(() => {
    if (followUserAction?.handle && followUserAction.handle === handle) {
      setFollowing((prevState) => !prevState);
      updateFollowerCount(followUserAction.val, index);
    }
  }, [followUserAction]);

  useEffect(() => {
    setFollowing(isFollowing);
  }, [isFollowing]);

  const handleButtonClick = () => {
    let val = 1;
    if (following) {
      updateFollowing(userId, "unfollow");
      val = -1;
    } else updateFollowing(userId, "follow");

    dispatchUser(dispatchFollowing(val));
    emitFollowAction(handle, val);
  };
  return (
    <PurpleButton onClick={handleButtonClick} className={classes.button}>
      {buttonText}
    </PurpleButton>
  );
};

export default FollowButton;
