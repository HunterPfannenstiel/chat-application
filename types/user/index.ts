import { FeedPost } from "@_types/post/feed-post";

export type UserInfo = {
  userImage: string;
  userName: string;
  userHandle: string;
};

export type UserDetails = {
  followingCount: number;
  followerCount: number;
  userId?: number;
  bio?: string;
  isFollowing?: boolean;
  isSignedIn?: boolean;
} & UserInfo;

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

export type UserImage = {
  imageUrl: string;
  publicId: string;
  aspectRatio: number;
};

export const defaultUser: UserDetails = {
  userHandle: "defaultuser",
  userName: "DefaultUser",
  userImage:
    "https://res.cloudinary.com/dwg1i9w2u/image/upload/v1682219857/DefaultUser_ou2hrg.jpg",
  followerCount: 0,
  followingCount: 0,
  userId: 0,
  isSignedIn: false,
};
