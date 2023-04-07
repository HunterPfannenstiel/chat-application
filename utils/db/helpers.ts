import sql from "mssql";
import { CreatePost } from "@_types/post";

export const execCreatePost = async (db: any, post: CreatePost) => {
  const request = new sql.Request(db);
  request.input("userId", post.userId);
  request.input("content", post.content);
  request.input("replyToPostId", post.replyToPostId);
  request.input("communityId", post.communityId);
  request.input("images", createImageTableInput(post.images));
  request.output("postId", sql.Int);
  const res = await request.execute("Chat.CreatePost");
  console.log("PostId", res.output.postId);
  return res.output.postId;
};

//@userId INT, @content NVARCHAR(280), @replyToPostId INT, @communityId INT, @isPinned BIT, @images IMAGES READONLY, @postId INT OUTPUT

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
  const imageTable = new sql.Table("ImageTableType");
  imageTable.columns.add("imageUrl", sql.NVarChar(500));
  imageTable.columns.add("publicId", sql.NVarChar(100));
  imageTable.columns.add("aspectRatio", sql.Numeric(5, 3));
  return imageTable;
};
