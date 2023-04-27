import { UpdateUser, UserDetails, defaultUser } from "@_types/user";
import { Dispatch } from "react";

export type UserContext = UserDetails & {
  isLoading: boolean;
  dispatchUser: Dispatch<(state: UserDetails) => UserDetails>;
  emitFollowAction: (handle: string, val: number) => void;
  followUserAction: { handle: string; val: number } | undefined;
};

export type UserDelegate<T> = (
  params: T
) => (state: UserDetails) => UserDetails;

export const getInitialContext = (): UserContext => {
  return {
    userName: "",
    userHandle: "",
    userImage: "",
    followerCount: 0,
    followingCount: 0,
    isLoading: true,
    dispatchUser: () => {},
    emitFollowAction: (handle: string, val: number) => {},
    followUserAction: undefined,
  };
};

export const getInitialUser = (): UserDetails => {
  return {
    userName: "",
    userHandle: "",
    userImage: "",
    followerCount: 0,
    followingCount: 0,
  };
};

//updateFollowing count
//update username, handle, bio, image

export const initializeUser: UserDelegate<UserDetails> = (user) => (state) => {
  if (user.userId === 0) user.isSignedIn = false;
  else user.isSignedIn = true;
  return user;
};

export const updateFollowing: UserDelegate<number> =
  (updateAmount) => (state) => {
    const copyState = { ...state };
    copyState.followingCount += updateAmount;
    return copyState;
  };

export const updateDetails: UserDelegate<UpdateUser> = (details) => (state) => {
  const copyState = { ...state };
  if (details.userName) copyState.userName = details.userName;
  if (details.userHandle) copyState.userHandle = details.userHandle;
  if (details.imageUrl) copyState.userImage = details.imageUrl;
  if (details.bio) copyState.bio = details.bio;
  return copyState;
};

export const signoutUser: UserDelegate<void> = () => (state) => {
  return defaultUser;
};
