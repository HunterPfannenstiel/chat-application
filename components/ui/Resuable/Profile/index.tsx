import UserDetails from "@ui/Profile/UserDetails";
import { FunctionComponent, ReactNode } from "react";
import Banner from "./Banner";
import classes from "./Profile.module.css";

interface ProfileProps {
  userImage: string;
  userName: string;
  userHandle: string;
  dateDisplay?: ReactNode;
  bio?: ReactNode;
  aggregateData?: ReactNode;
}

const Profile: FunctionComponent<ProfileProps> = ({
  userImage,
  userName,
  userHandle,
  dateDisplay,
  bio,
  aggregateData,
}) => {
  return (
    <section>
      <Banner imageUrl={userImage} />
      <UserDetails>
        <div>
          <h2>{userName}</h2>
          <p>{`@${userHandle}`}</p>
        </div>
        {dateDisplay}
        {bio}
        {aggregateData}
      </UserDetails>
    </section>
  );
};

export default Profile;
