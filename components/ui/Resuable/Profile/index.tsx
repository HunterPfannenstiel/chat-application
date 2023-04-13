import { FunctionComponent, ReactNode } from "react";
import Banner from "./Banner";
import classes from "./index.module.css";

interface ProfileProps {
  userImage: string;
  userName: string;
  userHandle: string;
  dateDisplay?: ReactNode;
  bio?: ReactNode;
  aggregateData?: ReactNode;
  isUsersProfile: boolean;
  toggleEdit: () => void;
}

const Profile: FunctionComponent<ProfileProps> = ({
  userImage,
  userName,
  userHandle,
  dateDisplay,
  bio,
  aggregateData,
  isUsersProfile,
  toggleEdit,
}) => {
  return (
    <section>
      <Banner imageUrl={userImage} />
      <div className={classes.user_details}>
        {!isUsersProfile && (
          <button
            className={classes.edit + " " + classes.spacer}
            onClick={toggleEdit}
          >
            Edit
          </button>
        )}
        {isUsersProfile && <div className={classes.spacer} />}
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
