import { ConnectionPool, MAX } from "mssql/msnodesqlv8";
import {
  createImageTableInput,
  createDatabaseRequest,
  executeProcedure,
  executeFunction,
  useDB,
} from "./helpers";
import { ProcedureParam } from "@_types/db";
import sql from "mssql/msnodesqlv8";
import { getDB } from "./connect";
import { UserFeed } from "@_types/user";
import { CreatePost } from "@_types/post";

export const execFetchFeed = async (userId: number) =>
  useDB(async (db) => {
    const params: ProcedureParam[] = [
      { paramName: "userId", isInput: true, value: userId },
    ];
    const request = createDatabaseRequest(db, params);
    const res = await executeProcedure("Chat.FetchFeed", request);
    return res.recordset[0];
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
      { paramName: "postId", isInput: false, outputType: sql.Int },
    ]);
    const res = await request.execute("Chat.CreatePost");
    console.log("PostId", res.output.postId);
    return res.output.postId;
  };

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
    return res.recordset;
  };
