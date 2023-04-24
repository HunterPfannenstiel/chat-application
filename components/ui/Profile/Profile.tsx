import Profile from "@ui/Resuable/Profile";
import { Dispatch, FunctionComponent, SetStateAction } from "react";
import ProfileNav from "./ProfileNav";
import Links from "./UserDetails/Links";
import Header from "./Header/Header";
import EditModal from "./EditModal/EditModal";
import useAnimateModal from "@hooks/animation/useAnimateModal";
import UserPosts from "./UserPosts/UserPosts";
import { createFormData } from "utils/form";
import { UserDetails } from "@_types/user";
import { FormImage } from "@ui/Resuable/SignupForm/Form";
import { FeedPost } from "@_types/post/feed-post";
import useUserDetails from "@hooks/profile/useUserDetails";

interface ProfilePageProps {
  posts: FeedPost[];
}

const ProfilePage: FunctionComponent<ProfilePageProps> = ({ posts }) => {
  const { user, isUsersProfile, setUser } = useUserDetails();
  const { playAnimation, showModal, toggle } = useAnimateModal(300);
  //What if user updates profile twice? Old user info is displayed
  if (user) {
    return (
      <>
        <Header userName={user.userName} />
        <Profile
          user={user}
          isUsersProfile={!!isUsersProfile}
          toggleEdit={toggle}
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
        <UserPosts
          posts={posts}
          isUsersProfile={!!isUsersProfile}
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
            userInfo={user}
            handleForm={handleForm(setUser)}
          />
        )}
      </>
    );
  }
  return <p>Show loading!</p>;
};

const handleForm =
  (setUpdatedUser: Dispatch<SetStateAction<UserDetails | undefined>>) =>
  async (
    name: string | undefined,
    handle: string | undefined,
    bio: string | undefined,
    image: FormImage | undefined
  ) => {
    const formData = createFormData({
      userName: name || null,
      userHandle: handle || null,
      bio: bio || null,
      image: image?.blob || null,
    });
    const res = await fetch("/api/user/create", {
      method: "PUT",
      body: formData,
    });
    if (res.ok) {
      const data = await res.json();
      console.log("IS VALID", data);
      setUpdatedUser((prevState) => {
        const newUser: UserDetails = {
          ...prevState!,
          userHandle: handle || prevState!.userHandle,
          userName: name || prevState!.userName,
          userImage: image?.imageUrl || prevState!.userImage,
          bio: bio || prevState!.bio,
        };
        return newUser;
      });
    } else {
      console.log("Update user error!");
    }
  };

export default ProfilePage;
