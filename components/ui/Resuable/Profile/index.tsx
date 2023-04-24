import { FunctionComponent, ReactNode, useState } from "react";
import Banner from "./Banner";
import classes from "./index.module.css";
import PurpleButton from "../Icons/PurpleButton";
import { updateFollowing } from "utils/actions";

interface ProfileProps {
  userImage: string;
  userName: string;
  userHandle: string;
  userId: number;
  dateDisplay?: ReactNode;
  bio?: ReactNode;
  aggregateData?: ReactNode;
  isUsersProfile: boolean;
  isFollowing?: boolean;
  toggleEdit: () => void;
}

const Profile: FunctionComponent<ProfileProps> = ({
  userImage,
  userName,
  userHandle,
  userId,
  dateDisplay,
  bio,
  aggregateData,
  isUsersProfile,
  isFollowing,
  toggleEdit,
}) => {
  const [follow, setFollow] = useState(!!isFollowing);
  const followHandler = () => {
    updateFollowing(userId, follow ? "unfollow" : "follow");
    setFollow((prevState) => !prevState);
  };
  return (
    <section>
      <Banner imageUrl={userImage} />
      <div className={classes.user_details}>
        {!isUsersProfile && (
          <PurpleButton className={classes.button} onClick={toggleEdit}>
            Edit
          </PurpleButton>
        )}
        {isUsersProfile && (
          <PurpleButton className={classes.button} onClick={followHandler}>
            {follow ? "Unfollow" : "Follow"}
          </PurpleButton>
        )}
        <div>
          <h2 className="username">{userName}</h2>
          <p className="handle">{`@${userHandle}`}</p>
        </div>
        {dateDisplay}
        {bio}
        {aggregateData}
      </div>
    </section>
  );
};

export default Profile;
