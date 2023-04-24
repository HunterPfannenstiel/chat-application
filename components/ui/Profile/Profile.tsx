import Profile from "@ui/Resuable/Profile";
import { Profile as UserP } from "@_types/user/profile";
import { FunctionComponent, useState } from "react";
import ProfileNav from "./ProfileNav";
import Links from "./UserDetails/Links";
import Header from "./Header/Header";
import EditModal from "./EditModal/EditModal";
import useAnimateModal from "@hooks/animation/useAnimateModal";
import UserPosts from "./UserPosts/UserPosts";
import { createFormData } from "utils/form";
import { UpdateUser } from "@_types/user";
import { FormImage } from "@ui/Resuable/SignupForm/Form";

interface ProfilePageProps {
  profile: UserP;
}

const ProfilePage: FunctionComponent<ProfilePageProps> = ({ profile }) => {
  const { user, isUsersProfile } = profile;
  const { playAnimation, showModal, toggle } = useAnimateModal(300);
  const [updatedUser, setUpdatedUser] = useState<UpdateUser | undefined>();
  //Create a variable that holds updatedUser/user info
  //Update user profile posts to reflect changes
  return (
    <>
      <Header userName={user.userName} />
      <Profile
        userImage={updatedUser?.imageUrl || user.userImage}
        userHandle={updatedUser?.userHandle || user.userHandle}
        userName={updatedUser?.userName || user.userName}
        userId={user.userId}
        isUsersProfile={isUsersProfile}
        toggleEdit={toggle}
        bio={<p>{updatedUser?.bio || user.bio}</p>}
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
        posts={user.posts}
        isUsersProfile={isUsersProfile}
        user={{
          userName: user.userName,
          userHandle: user.userHandle,
          userImage: user.userImage,
        }}
      />
      {showModal && (
        <EditModal
          playAnimation={playAnimation}
          toggle={toggle}
          animationTime={300}
          userInfo={{ ...user }}
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
