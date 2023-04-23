import { FeedPost } from "../post/feed-post";
import { UserInfo } from ".";

export type UserProfile = {
  bio: string;
  createdDate: Date;
  ethereumAddress?: string;
  userId: number;
  followerCount: number;
  followingCount: number;
  communityCount: number;
  posts: FeedPost[];
} & UserInfo;

export type Profile = { user: UserProfile; isUsersProfile: boolean };
