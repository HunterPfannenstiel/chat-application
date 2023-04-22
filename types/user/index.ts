import { FeedPost } from "@_types/post/feed-post";

export type UserInfo = {
  userImage: string;
  userName: string;
  userHandle: string;
};

export type UserDetails = {
  followingCount: number;
  followerCount: number;
} & UserInfo;

export type UserContext = {
  bio: string;
} & UserDetails;

export type UserFeed = {
  posts?: FeedPost[];
} & UserDetails;

export type DBFeed = {
  posts?: string;
} & UserDetails;

export type User = {
  bio: string;
  email?: string;
  ethereumAddress?: string;
} & UserInfo;

export type CreateUser = {
  publicId: string;
} & User;

export type UpdateUser = {
  imageUrl?: string;
  publicId?: string;
  userName?: string;
  userHandle?: string;
  bio?: string;
};

export type ConnectionsDetails = {
  bio: string;
  userId: number;
  isFollowing?: number;
} & UserInfo;
