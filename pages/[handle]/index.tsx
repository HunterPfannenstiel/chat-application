import Profile from "@ui/Profile/Profile";
import useProfile from "@hooks/profile/useProfile";
import { FunctionComponent } from "react";
import classes from "./Profile.module.css";

interface ProfilePageProps {}

const ProfilePage: FunctionComponent<ProfilePageProps> = () => {
  const { posts } = useProfile();
  if (!posts) {
    return <h1>Loading...</h1>;
  } else {
    return <Profile posts={posts} />;
  }
};

export default ProfilePage;
