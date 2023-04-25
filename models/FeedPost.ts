import { UpdatePost, PostLike } from "@_types/post";
import { FeedPost as Post } from "@_types/post/feed-post";
import { CreatePost } from "@_types/post";
import { useDB } from "utils/db/helpers";
import {
  execCreatePost,
  execLikePost,
  execUpdatePost,
  fetchFeedPage,
  fetchGlobalFeed,
  getPostComments,
} from "utils/db/post-commands";
import { DBFeed, UserFeed } from "@_types/user";
import { PageProcedureParams } from "@_types/db";

export class FeedPost {
  static fetch(postId: number, userId: number, page: number): Promise<Post> {
    //Make query to database
    //Check if post was returned
    //Make new post a return
    return useDB(getPostComments(postId, userId, page));
  }

  static feedPage(
    userId: number,
    params: PageProcedureParams
  ): Promise<DBFeed> {
    return fetchFeedPage(userId, params);
  }

  static fetchGlobal(params: PageProcedureParams, userId?: number) {
    return fetchGlobalFeed(params, userId);
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
  static update(
    postId: string,
    updates: UpdatePost,
    deleteImages: boolean
  ): Promise<{ publicId: string }[]> {
    return execUpdatePost(postId, updates, deleteImages);
  }
  static delete(postId: string): Promise<void> {
    throw new Error("Method not implemented.");
  }

  static like(postId: number, userId: number, action: "like" | "unlike") {
    return execLikePost(userId, postId, action === "like" ? 1 : 0);
  }
}

export default FeedPost;
