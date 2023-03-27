import { UpdatePost, PostLike } from "@_types/post";
import { FeedPost as FP } from "@_types/post/feed-post";
import { Post } from "@_types/post";
import { mockFeedPosts } from "mock-data/posts";

export class FeedPost {
  static fetch(postId: string): Promise<FP[]> {
    //Make query to database
    //Check if post was returned
    //Make new post a return
    return new Promise((resolve) => {
      resolve([mockFeedPosts[0]]);
    });
  }

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

  static fetchPoster(postId: string): Promise<string> {
    throw new Error("Method not implemented.");
  }

  static create(contents: Post): Promise<void> {
    //Send query that fills in the correct post fields with 'contents'
    throw new Error("Method not implemented.");
  }
  static update(postId: string, updates: UpdatePost): Promise<void> {
    throw new Error("Method not implemented.");
  }
  static delete(postId: string): Promise<void> {
    throw new Error("Method not implemented.");
  }
}

export default FeedPost;
