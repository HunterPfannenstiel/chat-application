import Profile from "@ui/Resuable/Profile";
import { Profile as UserProfile } from "@_types/user/profile";
import { FunctionComponent } from "react";
import ProfileNav from "./ProfileNav";
import Links from "./UserDetails/Links";
import Header from "./Header/Header";
import EditModal from "./EditModal/EditModal";
import useAnimateModal from "@hooks/animation/useAnimateModal";
import UserPosts from "./UserPosts/UserPosts";

interface ProfilePageProps {
  profile: UserProfile;
}

const ProfilePage: FunctionComponent<ProfilePageProps> = ({ profile }) => {
  const { user, isUsersProfile } = profile;
  const { playAnimation, showModal, toggle } = useAnimateModal(300);
  return (
    <>
      <Header userName={user.userName} />
      <Profile
        userImage={user.userImage}
        userHandle={user.userHandle}
        userName={user.userName}
        isUsersProfile={isUsersProfile}
        toggleEdit={toggle}
        bio={<p>{user.bio}</p>}
        aggregateData={
          <Links
            linkInfo={[
              {
                href: `/${user.userHandle}/following`,
                count: user.followingCount,
                label: "Following",
              },
              {
                href: `/${user.userHandle}/followers`,
                count: user.followerCount,
                label: "Followers",
              },
            ]}
          ></Links>
        }
      />
      <ProfileNav />
      <UserPosts posts={user.posts} isUsersProfile={isUsersProfile} />
      {showModal && (
        <EditModal
          playAnimation={playAnimation}
          toggle={toggle}
          animationTime={300}
          userInfo={{ ...user }}
        />
      )}
    </>
  );
};

export default ProfilePage;
