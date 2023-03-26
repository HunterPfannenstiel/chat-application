import { UpdatePost, PostLike } from "@_types/post";
import { FeedPost as FP } from "@_types/post/feed-post";
import { Post } from "@_types/post";
import { mockFeedPosts } from "mock-data/posts";

export class FeedPost {
  static fetchFeed(userId: string): Promise<FP[]> {
    //*'userId' will be a valid userId*
    //Get all of 'id's' followers and join their posts
    //Sort by 'createdOn'
    //Fetch first x amount of rows
    //Return posts
    return new Promise((resolve) => {
      resolve(mockFeedPosts);
    });
  }

  static fetchComments(postId: string): Promise<FP[]> {
    throw new Error("Method not implemented.");
  }

  static fetchLikes(postId: string): Promise<PostLike[]> {
    throw new Error("Method not implemented.");
  }

  static create(contents: Post): Promise<void> {
    //Send query that fills in the correct post fields with 'contents'
    throw new Error("Method not implemented.");
  }
  static update(postId: string, updates: UpdatePost): Promise<void> {
    throw new Error("Method not implemented.");
  }
  static delete(postId: string, userId: string): Promise<void> {
    throw new Error("Method not implemented.");
  }

  static getByPostId(postId: string) {
    //Make query to database
    //Check if post was returned
    //Make new post a return
  }

  static getByUserId(userId: string) {}

  getLikes() {}
}

// Fetch Feed - Need UserId
// Fetch Profile Posts - Need UserId
// Fetch Comments for Post - Need PostId
// Create Post - 'Post' info
// Update Post - Need PostId + new Info
// Delete Post - Need PostId

export default Post;
