import { Tag, ViewPost } from ".";

export interface FeedPost extends ViewPost {
  tags: Tag[];
}

export type PostComments = {
  originalPost: FeedPost;
  comments?: FeedPost[];
};
