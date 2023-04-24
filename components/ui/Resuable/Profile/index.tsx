import { FunctionComponent, ReactNode, useState } from "react";
import Banner from "./Banner";
import classes from "./index.module.css";
import PurpleButton from "../Icons/PurpleButton";
import { updateFollowing } from "utils/actions";
import { UserDetails } from "@_types/user";

interface ProfileProps {
  user: UserDetails;
  dateDisplay?: ReactNode;
  aggregateData?: ReactNode;
  isUsersProfile: boolean;
  isFollowing?: boolean;
  toggleEdit: () => void;
}

const Profile: FunctionComponent<ProfileProps> = ({
  user,
  dateDisplay,
  aggregateData,
  isUsersProfile,
  isFollowing,
  toggleEdit,
}) => {
  const [follow, setFollow] = useState(!!isFollowing);
  const followHandler = () => {
    updateFollowing(user.userId!, follow ? "unfollow" : "follow");
    setFollow((prevState) => !prevState);
  };
  return (
    <section>
      <Banner imageUrl={user.userImage} />
      <div className={classes.user_details}>
        {isUsersProfile && (
          <PurpleButton className={classes.button} onClick={toggleEdit}>
            Edit
          </PurpleButton>
        )}
        {!isUsersProfile && (
          <PurpleButton className={classes.button} onClick={followHandler}>
            {follow ? "Unfollow" : "Follow"}
          </PurpleButton>
        )}
        <div>
          <h2 className="username">{user.userName}</h2>
          <p className="handle">{`@${user.userHandle}`}</p>
        </div>
        {dateDisplay}
        {user.bio}
        {aggregateData}
      </div>
    </section>
  );
};

export default Profile;
