import Profile from "@ui/Profile/Profile";
import useProfile from "@hooks/profile/useProfile";
import { FunctionComponent } from "react";
import classes from "./Profile.module.css";

interface ProfilePageProps {}

const ProfilePage: FunctionComponent<ProfilePageProps> = () => {
  const { profile, isLoading, error } = useProfile();
  if (isLoading) {
    return <h1>Loading...</h1>;
  }
  if (error) {
    return (
      <>
        <h1>{`ERROR: ${error}`}</h1>
        <p>Please try again!</p>
      </>
    );
  }
  if (profile) {
    return <Profile profile={profile} />;
  }
  return <h1>Profile Page!</h1>;
};

export default ProfilePage;
