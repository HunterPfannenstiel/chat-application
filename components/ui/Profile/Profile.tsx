import Profile from "@ui/Resuable/Profile";
import { Profile as UserProfile } from "@_types/user/profile";
import { FunctionComponent } from "react";
import ProfileNav from "./ProfileNav";
import Links from "./UserDetails/Links";
import FeedPostList from "@ui/Resuable/FeedPost/FeedPostList";
import Header from "./Header/Header";
import EditModal from "./EditModal/EditModal";
import useAnimateModal from "@hooks/animation/useAnimateModal";

interface ProfilePageProps {
  profile: UserProfile;
}

const ProfilePage: FunctionComponent<ProfilePageProps> = ({ profile }) => {
  const { user, isUsersProfile } = profile;
  const { playAnimation, showModal, toggleModal } = useAnimateModal(300);
  console.log(isUsersProfile);
  return (
    <>
      <Header userName={user.userName} />
      <Profile
        userImage={user.userImage}
        userHandle={user.userHandle}
        userName={user.userName}
        isUsersProfile={isUsersProfile}
        toggleEdit={toggleModal}
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
      <FeedPostList posts={user.posts} />
      {showModal && (
        <EditModal
          playAnimation={playAnimation}
          toggleModal={toggleModal}
          animationTime={300}
          userInfo={{ ...user }}
        />
      )}
    </>
  );
};

export default ProfilePage;
