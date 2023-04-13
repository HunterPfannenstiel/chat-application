import { Tag, ViewPost } from ".";

export interface FeedPost extends ViewPost {
  tags: Tag[];
  isLiked: number;
}
