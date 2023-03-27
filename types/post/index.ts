import { UserInfo } from "@_types/user";

export type Tag = {
  tagId: string;
  name: string;
  description: string;
  color: string;
};

export type PostLike = UserInfo;

export type ViewPost = {
  postId: string;
  content: string;
  likeCount: number;
  imageUrls: string[];
  createdOn: Date;
  commentCount: number;
  replyToPostId?: string;
} & UserInfo;

export type Post = {
  userId: string;
  content: string;
  replyToPostId?: string;
  communityId?: string;
};

export type UpdatePost = {
  content?: string;
  imageUrls?: string[];
};

// export abstract class IPost {
//   fetchFeed(id: string): Promise<ViewPost[]>;
//   createPost(contents: Post): Promise<void>;
//   updatedPost(postId: string, updates: UpdatePost): Promise<void>;
//   deletePost(postId: string, userId: string): Promise<void>;
// }