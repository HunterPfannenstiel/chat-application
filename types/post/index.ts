import { UserInfo } from "@_types/user";
import { ImageInfo } from "@ui/Resuable/PostModal/types";

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
  postId: number;
  content: string;
  likeCount: number;
  commentCount: number;
  images?: Image[];
  createdOn: string;
  replyToPostId?: number;
} & UserInfo;

export type ClientPost = {
  content: string;
  replyToPostId?: string;
  communityId?: string;
  imageUrls?: File[];
};

export type CreatePost = {
  userId: number;
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
  images?: ImageUpload[];
};

export type CreatePostHandler = (
  content: string,
  images: ImageInfo[],
  deleteImage: boolean
) => Promise<any>;
