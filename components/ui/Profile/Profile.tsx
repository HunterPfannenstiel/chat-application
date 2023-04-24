import Profile from "@ui/Resuable/Profile";
import { Profile as UserP, UserProfile } from "@_types/user/profile";
import { FunctionComponent, useState } from "react";
import ProfileNav from "./ProfileNav";
import Links from "./UserDetails/Links";
import Header from "./Header/Header";
import EditModal from "./EditModal/EditModal";
import useAnimateModal from "@hooks/animation/useAnimateModal";
import UserPosts from "./UserPosts/UserPosts";
import { createFormData } from "utils/form";
import { UpdateUser, UserDetails } from "@_types/user";
import { FormImage } from "@ui/Resuable/SignupForm/Form";
import { FeedPost } from "@_types/post/feed-post";

interface ProfilePageProps {
  posts: FeedPost[];
  user: UserDetails;
  isUsersProfile: boolean;
}

const ProfilePage: FunctionComponent<ProfilePageProps> = ({
  posts,
  user,
  isUsersProfile,
}) => {
  const { playAnimation, showModal, toggle } = useAnimateModal(300);
  const [updatedUser, setUpdatedUser] = useState<UpdateUser | undefined>();
  //What if user updates profile twice? Old user info is displayed
  const currUser = {
    userName: updatedUser?.userName || user.userName,
    userHandle: updatedUser?.userHandle || user.userHandle,
    userImage: updatedUser?.imageUrl || user.userImage,
    bio: updatedUser?.bio || (user.bio as string),
  };
  return (
    <>
      <Header userName={user.userName} />
      <Profile
        userImage={currUser.userImage}
        userHandle={currUser.userHandle}
        userName={currUser.userName}
        userId={user.userId || 0}
        isUsersProfile={isUsersProfile}
        toggleEdit={toggle}
        bio={<p>{currUser.bio}</p>}
        aggregateData={
          <Links
            linkInfo={[
              {
                href: `/${
                  updatedUser?.userHandle || user.userHandle
                }/following`,
                count: user.followingCount,
                label: "Following",
              },
              {
                href: `/${
                  updatedUser?.userHandle || user.userHandle
                }/followers`,
                count: user.followerCount,
                label: "Followers",
              },
            ]}
          ></Links>
        }
      />
      <ProfileNav />
      <UserPosts
        posts={posts}
        isUsersProfile={isUsersProfile}
        user={{
          userName: currUser.userName,
          userHandle: currUser.userHandle,
          userImage: currUser.userImage,
        }}
      />
      {showModal && (
        <EditModal
          playAnimation={playAnimation}
          toggle={toggle}
          animationTime={300}
          userInfo={currUser}
          handleForm={handleForm(setUpdatedUser)}
        />
      )}
    </>
  );
};

const handleForm =
  (setUpdatedUser: (user: UpdateUser) => void) =>
  async (
    name: string | undefined,
    handle: string | undefined,
    bio: string | undefined,
    image: FormImage | undefined
  ) => {
    const formData = createFormData({
      userName: name,
      userHandle: handle,
      bio,
      image,
    });
    const res = await fetch("/api/user/create", {
      method: "PUT",
      body: formData,
    });
    if (res.ok) {
      const data = await res.json();
      console.log("IS VALID", data);
      setUpdatedUser({
        userName: name,
        userHandle: handle,
        bio,
        imageUrl: image?.imageUrl,
      });
    }
  };

export default ProfilePage;
