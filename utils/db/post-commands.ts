import { ConnectionPool, MAX } from "mssql/msnodesqlv8";
import {
  createImageTableInput,
  createProcedureRequest,
  executeProcedure,
} from "./helpers";
import { ProcedureParam } from "@_types/db";
import sql from "mssql/msnodesqlv8";
import { getDB } from "./connect";
import { UserFeed } from "@_types/user";
import { CreatePost } from "@_types/post";

export const execFetchFeed = async (userId: number) => {
  const db = await getDB();
  const params: ProcedureParam[] = [
    { paramName: "userId", isInput: true, value: userId },
  ];
  const request = createProcedureRequest(db, params);
  const res = await executeProcedure("Chat.FetchFeed", request);
  return res.recordset[0];
};

export const execCreatePost =
  (post: CreatePost) => async (db: ConnectionPool) => {
    const request = createProcedureRequest(db, [
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
