import { FeedPost } from "../post/feed-post";
import { UserInfo } from ".";

export type UserProfile = {
  bio: string;
  createdDate: Date;
  ethereumAddress?: string;
  followerCount: number;
  followingCount: number;
  communityCount: number;
  posts: FeedPost[];
} & UserInfo;
