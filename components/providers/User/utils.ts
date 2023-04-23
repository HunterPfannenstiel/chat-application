import { UserDetails } from "@_types/user";

export const getInitialContext = (): UserDetails => {
  return {
    userName: "",
    userHandle: "",
    userImage: "",
    followerCount: 0,
    followingCount: 0,
  };
};
