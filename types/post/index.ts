import { UserInfo } from "@_types/user";

export type Tag = {
  tagId: string;
  name: string;
  description: string;
  color: string;
};

export type Image = {
  imageUrl: string;
  aspectRatio: number;
};

export type PostLike = { bio: string } & UserInfo;

export type ViewPost = {
  postId: string;
  content: string;
  likeCount: number;
  commentCount: number;
  images?: Image[];
  createdOn: string;
  replyToPostId?: string;
} & UserInfo;

export type ClientPost = {
  content: string;
  replyToPostId?: string;
  communityId?: string;
  imageUrls?: File[];
};

export type CreatePost = {
  userId: string;
  content: string;
  replyToPostId?: string;
  communityId?: string;
  images: ImageUpload[];
};

export type ImageUpload = {
  publicId: string;
  imageUrl: string;
  aspectRatio: number;
};

export type UpdatePost = {
  content?: string;
  imageUrls?: string[];
};
