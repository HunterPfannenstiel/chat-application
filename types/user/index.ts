export type UserInfo = {
  userImage: string;
  userName: string;
  userHandle: string;
};

export type User = {
  bio: string;
  email?: string;
  ethereumAddress?: string;
} & UserInfo;

export type UpdateUser = {
  userImage?: string;
  userName?: string;
  userHandle?: string;
  bio?: string;
  email?: string;
  ethereumAddress?: string;
};

export type FollowerDetails = {
  bio: string;
} & UserInfo;
