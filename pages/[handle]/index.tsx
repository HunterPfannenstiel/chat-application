import Profile from "@ui/Profile/Profile";
import useProfile from "@hooks/profile/useProfile";
import { FunctionComponent } from "react";
import classes from "./Profile.module.css";
import LoadingIcon from "@ui/Resuable/Loading/LoadingIcon";

interface ProfilePageProps {}

const ProfilePage: FunctionComponent<ProfilePageProps> = () => {
  const { posts, setScrollEvent, isLoading } = useProfile();
  if (!posts) {
    return <></>;
  } else {
    console.log("top posts", posts);
    return (
      <Profile
        posts={posts}
        setScrollEvent={setScrollEvent}
        isPostLoading={isLoading}
      />
    );
  }
};

export default ProfilePage;
