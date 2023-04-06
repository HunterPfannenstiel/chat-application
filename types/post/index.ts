import { UserInfo } from "@_types/user";

export type Tag = {
  tagId: string;
  name: string;
  description: string;
  color: string;
};

export type PostLike = { bio: string } & UserInfo;

export type ViewPost = {
  postId: string;
  content: string;
  likeCount: number;
  commentCount: number;
  imageUrls: string[];
  createdOn: Date;
  replyToPostId?: string;
} & UserInfo;

export type ClientPost = {
  content: string;
  replyToPostId?: string;
  communityId?: string;
  imageUrls?: string[];
};

export type Post = {
  userId: string;
} & ClientPost;

export type UpdatePost = {
  content?: string;
  imageUrls?: string[];
};
