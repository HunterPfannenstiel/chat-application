import { ConnectionPool, MAX } from "mssql/msnodesqlv8";
import {
  createImageTableInput,
  createDatabaseRequest,
  executeProcedure,
  executeFunction,
  useDB,
} from "./helpers";
import { PageProcedureParams, ProcedureParam } from "@_types/db";
import sql from "mssql/msnodesqlv8";
import { CreatePost, UpdatePost } from "@_types/post";
import { FeedPost } from "@_types/post/feed-post";

export const fetchFeedPage = (userId: number, params: PageProcedureParams) =>
  useDB(async (db) => {
    const request = createDatabaseRequest(db, [
      { paramName: "userId", isInput: true, value: userId },
      { paramName: "page", isInput: true, value: params.page },
      {
        paramName: "createdDateTime",
        isInput: true,
        value: params.createdDateTime,
      },
    ]);
    const res = await executeFunction(
      "SELECT * FROM Chat.FetchFeedPage(@userId, @page, @createdDateTime)",
      request
    );
    return res.recordset;
  });

export const fetchGlobalFeed = (props: PageProcedureParams, userId?: number) =>
  useDB(async (db) => {
    const request = createDatabaseRequest(db, [
      { paramName: "page", isInput: true, value: props.page },
      { paramName: "userId", isInput: true, value: userId },
      {
        paramName: "createdDateTime",
        isInput: true,
        value: props.createdDateTime,
      },
    ]);
    const res = await executeFunction(
      "SELECT * FROM Chat.FetchGlobalFeed(@page, @userId, @createdDateTime)",
      request
    );
    if (res.recordset.length > 0) {
      res.recordset.forEach(async (post) => {
        if (post.images) post.images = await JSON.parse(post.images);
      });
    }
    console.log(res);
    return res.recordset;
  });

export const execCreatePost =
  (post: CreatePost) => async (db: ConnectionPool) => {
    const request = createDatabaseRequest(db, [
      { paramName: "userId", value: post.userId, isInput: true },
      { paramName: "content", value: post.content, isInput: true },
      { paramName: "replyToPostId", value: post.replyToPostId, isInput: true },
      { paramName: "communityId", value: post.communityId, isInput: true },
      {
        paramName: "images",
        value: createImageTableInput(post.images),
        isInput: true,
      },
    ]);
    const res = await request.execute("Chat.CreatePost");
    return res.recordset[0] as FeedPost;
  };

export const execUpdatePost = (
  postId: string,
  updates: UpdatePost,
  deleteImages: boolean
) =>
  useDB(async (db) => {
    const request = createDatabaseRequest(db, [
      { paramName: "postId", isInput: true, value: postId },
      { paramName: "content", isInput: true, value: updates.content || "" },
      {
        paramName: "images",
        isInput: true,
        value: createImageTableInput(updates.images || []),
      },
      { paramName: "deleteImages", isInput: true, value: deleteImages ? 1 : 0 },
      {
        paramName: "deletedImages",
        isInput: false,
        outputType: sql.NVarChar(MAX),
      },
    ]);
    const res = await executeProcedure("Chat.UpdatePost", request);
    let deletedImages = undefined;
    if (res.output.deletedImages) {
      deletedImages = await JSON.parse(res.output.deletedImages);
    }
    return deletedImages;
  });

export const getPostComments =
  (postId: number, userId: number, page: number) =>
  async (db: ConnectionPool) => {
    const request = createDatabaseRequest(db, [
      { paramName: "postId", value: postId, isInput: true },
      { paramName: "userId", value: userId, isInput: true },
      { paramName: "page", value: page, isInput: true },
    ]);
    const query =
      "SELECT * FROM Chat.FetchPostComments(@postId, @userId, @page)";
    const res = await executeFunction(query, request);
    if (res.recordset.length > 0) {
      console.log("comments", res.recordset);
      const posts = res.recordset as FeedPost[];
      posts.forEach(async (post) => {
        if (post.images) {
          post.images = await JSON.parse(post.images as any);
        }
      });
    }
    return res.recordset;
  };

export const execLikePost = (
  userId: number,
  postId: number,
  likePost: number
) =>
  useDB(async (db) => {
    const request = createDatabaseRequest(db, [
      { paramName: "userId", isInput: true, value: userId },
      { paramName: "postId", isInput: true, value: postId },
      { paramName: "like", isInput: true, value: likePost },
    ]);

    const res = await executeProcedure("Chat.LikePost", request);
    console.log("RES", res);
    return res;
  });
