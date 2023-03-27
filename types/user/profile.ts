import { FeedPost } from "models/FeedPost";
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
