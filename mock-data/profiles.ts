import { UserInfo } from "@_types/user";
import type { UserProfile } from "@_types/user/profile";
import { mockFeedPosts } from "./posts";

const happi: UserInfo = {
  userHandle: "happi",
  userName: "HappiTheMonkey",
  userImage: "/Images/happi.png",
};
const shoes: UserInfo = {
  userHandle: "ohShews",
  userName: "SHOES",
  userImage: "/Images/SHOES.png",
};
const joshua: UserInfo = {
  userHandle: "Stars",
  userName: "Joshua",
  userImage: "/Images/JoshuaStars.png",
};
const algonquin: UserInfo = {
  userHandle: "al",
  userName: "Algonks",
  userImage: "/Images/Algonquin.png",
};

export const mockProfiles: UserProfile[] = [
  {
    ...happi,
    bio: "I am Happi, the happy monkey",
    createdDate: new Date(),
    followerCount: 12343,
    followingCount: 1,
    communityCount: 2,
    posts: [mockFeedPosts[1]],
  },
  {
    ...shoes,
    bio: "donut smol",
    createdDate: new Date(),
    followerCount: 12,
    followingCount: 346,
    communityCount: 12,
    posts: [mockFeedPosts[0]],
  },
  {
    ...joshua,
    bio: "Fellow monkey, @happi is my younger brother",
    createdDate: new Date(),
    followerCount: 456,
    followingCount: 23,
    communityCount: 5,
    posts: [mockFeedPosts[2]],
  },
  {
    ...algonquin,
    bio: "big hedfones",
    createdDate: new Date(),
    followerCount: 330002,
    followingCount: 0,
    communityCount: 0,
    posts: [],
  },
];
