import { Tag } from ".";

export type FeedPost = {
  postId: string;
  userId: string;
  content: string;
  imageUrls: string[] | null;
  postTags: Tag[] | null;
  createdOn: Date;
  replyToPostId: string | null;
};
