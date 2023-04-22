import { UserContext } from "@_types/user";

export const getInitialContext = (): UserContext => {
  return {
    userName: "",
    userHandle: "",
    userImage: "",
    followerCount: 0,
    followingCount: 0,
    bio: "",
  };
};
