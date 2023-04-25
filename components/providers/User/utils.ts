import { UpdateUser, UserDetails } from "@_types/user";
import { Dispatch } from "react";

export type UserContext = UserDetails & {
  isLoading: boolean;
  dispatchUser: Dispatch<(state: UserDetails) => UserDetails>;
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
