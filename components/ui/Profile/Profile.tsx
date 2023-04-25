import Profile from "@ui/Resuable/Profile";
import { FunctionComponent, RefObject } from "react";
import ProfileNav from "./ProfileNav";
import Links from "./UserDetails/Links";
import Header from "./Header/Header";
import EditModal from "./EditModal/EditModal";
import useAnimateModal from "@hooks/animation/useAnimateModal";
import UserPosts from "./UserPosts/UserPosts";
import { FeedPost } from "@_types/post/feed-post";
import useUserDetails from "@hooks/profile/useUserDetails";
import useUpdateUser from "@hooks/profile/useUpdateUser";
import classes from "./Profile.module.css";

interface ProfilePageProps {
  posts: FeedPost[];
  scrollElem: RefObject<HTMLElement>;
}

const ProfilePage: FunctionComponent<ProfilePageProps> = ({
  posts,
  scrollElem,
}) => {
  const { user, isUsersProfile, setUser } = useUserDetails();
  const handleForm = useUpdateUser(setUser);
  const { playAnimation, showModal, toggle } = useAnimateModal(300);
  //What if user updates profile twice? Old user info is displayed
  if (user) {
    return (
      <section className={classes.profile} ref={scrollElem}>
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
        <ProfileNav handle={user.userHandle} />
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
            handleForm={handleForm}
          />
        )}
      </section>
    );
  }
  return <p>Show loading!</p>;
};

export default ProfilePage;
