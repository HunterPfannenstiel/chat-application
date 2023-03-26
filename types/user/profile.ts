import { ViewPost } from "@_types/post";
import { UserInfo } from ".";

export type UserProfile = {
  bio: string;
  createdDate: Date;
  ethereumAddress?: string;
  followerCount: number;
  followingCount: number;
  communityCount: number;
  posts: ViewPost[];
} & UserInfo;
