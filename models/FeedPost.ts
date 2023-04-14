import { UpdatePost, PostLike } from "@_types/post";
import { FeedPost as Post } from "@_types/post/feed-post";
import { CreatePost } from "@_types/post";
import { mockFeedPosts } from "mock-data/posts";
import { useDB } from "utils/db/helpers";
import { execCreatePost } from "utils/db/helpers";
import { execFetchFeed } from "utils/db/post-commands";

export class FeedPost {
  static fetch(postId: string): Promise<Post> {
    //Make query to database
    //Check if post was returned
    //Make new post a return
    return new Promise((resolve) => {
      resolve(mockFeedPosts[0]);
    });
  }

  static fetchFeed(userId: number) {
    //*'userId' will be a valid userId*
    //Get all of 'id's' followers and join their posts
    //Sort by 'createdOn'
    //Fetch first x amount of rows
    //Return posts
    return execFetchFeed(userId);
  }

  static fetchLikes(postId: string): Promise<PostLike[]> {
    throw new Error("Method not implemented.");
  }

  static fetchPoster(postId: string): Promise<string> {
    throw new Error("Method not implemented.");
  }

  static async create(contents: CreatePost) {
    //Send query that fills in the correct post fields with 'contents'
    return useDB(execCreatePost(contents));
  }
  static update(postId: string, updates: UpdatePost): Promise<void> {
    throw new Error("Method not implemented.");
  }
  static delete(postId: string): Promise<void> {
    throw new Error("Method not implemented.");
  }

  static like(postId: string, userId: string, action: "create" | "delete") {
    throw new Error("Method not implemented");
  }
}

export default FeedPost;
