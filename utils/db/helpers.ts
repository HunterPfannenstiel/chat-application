import sql from "mssql/msnodesqlv8";
import { CreatePost } from "@_types/post";
import { ConnectionPool } from "mssql/msnodesqlv8";
import { DBDelegate, ProcedureParam } from "@_types/db";
import { getDB } from "./connect";

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

//@userId INT, @content NVARCHAR(280), @replyToPostId INT, @communityId INT, @isPinned BIT, @images IMAGES READONLY, @postId INT OUTPUT

export const createProcedureRequest = (
  db: ConnectionPool,
  params: ProcedureParam[]
) => {
  try {
    const request = db.request();
    params.forEach((param) => {
      if (param.isInput) request.input(param.paramName, param.value);
      else request.output(param.paramName, param.outputType);
    });
    return request;
  } catch (error) {
    console.log("Create Procedure Error", error);
    throw error;
  }
};

export const executeProcedure = async (
  procedureName: string,
  req: sql.Request
) => {
  const res = await req.execute(procedureName);
  return res.output;
};

export const createImageTableInput = (
  images: { imageUrl: string; publicId: string; aspectRatio: number }[]
) => {
  const imageTable = getImageTable();
  images.forEach((image) => {
    imageTable.rows.add(image.imageUrl, image.publicId, image.aspectRatio);
  });
  return imageTable;
};

const getImageTable = () => {
  const imageTable = new sql.Table("IMAGES");
  imageTable.columns.add("imageUrl", sql.NVarChar(500));
  imageTable.columns.add("publicId", sql.NVarChar(100));
  imageTable.columns.add("aspectRatio", sql.Numeric(5, 3));
  return imageTable;
};

export const useDB = async (command: DBDelegate) => {
  let db;
  try {
    db = await getDB();
    const res = await command(db);
    return res;
  } catch (error) {
    throw error;
  } finally {
    if (db) db.close();
  }
};