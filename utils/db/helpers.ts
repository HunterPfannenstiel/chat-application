import sql from "mssql/msnodesqlv8";
import { CreatePost } from "@_types/post";
import { ConnectionPool } from "mssql/msnodesqlv8";
import { ProcedureParam } from "@_types/db";

export const execCreatePost = async (db: ConnectionPool, post: CreatePost) => {
  try {
    const request = db.request();
    request.input("userId", post.userId);
    request.input("content", post.content);
    request.input("replyToPostId", post.replyToPostId);
    request.input("communityId", post.communityId);
    request.input("images", createImageTableInput(post.images));
    request.output("postId", sql.Int);
    const res = await request.execute("Chat.CreatePost");
    console.log("PostId", res.output.postId);
    return res.output.postId;
  } catch (error) {
    console.log("ERROR WITH STORED", error);
    throw error;
  }
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
