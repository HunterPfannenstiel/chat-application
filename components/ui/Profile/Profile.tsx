import Profile from "@ui/Resuable/Profile";
import { UserProfile } from "@_types/user/profile";
import { FunctionComponent } from "react";
import ProfileNav from "./ProfileNav";
import Links from "./UserDetails/Links";
import FeedPostList from "@ui/Resuable/FeedPost/FeedPostList";

interface ProfilePageProps {
  profile: UserProfile;
}

const ProfilePage: FunctionComponent<ProfilePageProps> = ({ profile }) => {
  return (
    <>
      <Profile
        userImage={profile.userImage}
        userHandle={profile.userHandle}
        userName={profile.userName}
        bio={<p>{profile.bio}</p>}
        aggregateData={
          <Links
            linkInfo={[
              {
                href: `/${profile.userName}/following`,
                count: profile.followingCount,
                label: "Following",
              },
              {
                href: `/${profile.userName}/followers`,
                count: profile.followerCount,
                label: "Followers",
              },
            ]}
          ></Links>
        }
      />
      <ProfileNav />
      <FeedPostList posts={profile.posts} />
    </>
  );
};

export default ProfilePage;
