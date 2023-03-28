import Profile from "@ui/Resuable/Profile";
import { UserProfile } from "@_types/user/profile";
import { FunctionComponent } from "react";
import ProfileNav from "./ProfileNav";
import FollowLink from "./UserDetails/FollowLink";
import Links from "./UserDetails/Links";
import type FeedPost from "models/FeedPost";

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
          <Links>
            <FollowLink
              userName={profile.userName}
              param={"following"}
              count={profile.followingCount}
              text={"Following"}
            />
            <FollowLink
              userName={profile.userName}
              param={"followers"}
              count={profile.followerCount}
              text={"Followers"}
            />
          </Links>
        }
      />
      <ProfileNav />
      <div>
        <p>{profile.posts[0].content}</p>
        <p>{profile.posts[0].likeCount}</p>
        <p>{profile.posts[0].commentCount}</p>
      </div>
    </>
  );
};

export default ProfilePage;
