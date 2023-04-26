import { FunctionComponent, ReactNode } from "react";
import Banner from "./Banner";
import classes from "./index.module.css";
import PurpleButton from "../Icons/PurpleButton";
import { UserDetails } from "@_types/user";
import FollowButton from "../FollowButton/FollowButton";
import EditButton from "../Icons/EditButton";

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
  toggleEdit,
}) => {
  return (
    <section className={classes.profile}>
      <Banner imageUrl={user.userImage} />
      <div className={classes.user_details}>
        {isUsersProfile && (
          <EditButton className={classes.edit_button} onClick={toggleEdit} />
        )}
        {!isUsersProfile && (
          <FollowButton
            isFollowing={
              user.isFollowing === undefined ? true : user.isFollowing
            }
            userId={user.userId!}
          />
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
