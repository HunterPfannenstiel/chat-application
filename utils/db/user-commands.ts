import { CreateUser, UpdateUser, UserImage } from "@_types/user";
import {
  appendPageParams,
  createDatabaseRequest,
  createImageTableInput,
  executeFunction,
  executeProcedure,
  parseImages,
  useDB,
} from "./helpers";
import sql, { ConnectionPool, MAX } from "mssql/msnodesqlv8";
import { PageProcedureParams, ProcedureParam } from "@_types/db";

export const execCreateUser = (profile: CreateUser) =>
  useDB(async (db) => {
    const params: ProcedureParam[] = [
      { paramName: "name", isInput: true, value: profile.userName },
      { paramName: "handle", isInput: true, value: profile.userHandle },
      { paramName: "bio", isInput: true, value: profile.bio },
      { paramName: "email", isInput: true, value: profile.email },
      {
        paramName: "ethereumAddress",
        isInput: true,
        value: profile.ethereumAddress,
      },
      { paramName: "imageUrl", isInput: true, value: profile.userImage },
      { paramName: "publicId", isInput: true, value: profile.publicId },
      { paramName: "userId", isInput: false, outputType: sql.Int },
    ];
    const request = createDatabaseRequest(db, params);
    const res = await executeProcedure("Chat.CreateUser", request);
    return res.output.userId as number;
  });

export const execUpdateUser = (
  userId: number,
  user: UpdateUser,
  image: UserImage | undefined
) =>
  useDB(async (db) => {
    const params: ProcedureParam[] = [
      { paramName: "userId", isInput: true, value: userId },
      { paramName: "bio", isInput: true, value: user.bio },
      { paramName: "handle", isInput: true, value: user.userHandle },
      { paramName: "name", isInput: true, value: user.userName },
      {
        paramName: "deletedImage",
        isInput: false,
        outputType: sql.NVarChar(MAX),
      },
    ];
    if (image) {
      params.push({
        paramName: "image",
        isInput: true,
        value: createImageTableInput([image]),
      });
    }

    const request = createDatabaseRequest(db, params);
    const res = await executeProcedure("Chat.UpdateUser", request);
    console.log("Update user output", res);
    return res.output.deletedImage;
  });

export const fetchUserPosts = (
  handle: string,
  params: PageProcedureParams,
  category: string | undefined
) =>
  useDB(async (db) => {
    const request = createDatabaseRequest(db, [
      { paramName: "userHandle", isInput: true, value: handle },
      { paramName: "queryUserId", isInput: true, value: params.queryUserId },
      { paramName: "page", isInput: true, value: params.page },
      {
        paramName: "createdDateTime",
        isInput: true,
        value: params.createdDateTime,
      },
    ]);
    let procedure = "Chat.FetchUserPosts";
    if (category === "likes") procedure = "Chat.FetchLikedPosts";
    else if (category === "replies") procedure = "Chat.FetchReplyPosts";
    const res = await executeProcedure(procedure, request);
    parseImages(res.recordset);
    return res.recordset;
  });

export const isValidHandle = (handle: string) =>
  useDB(async (db) => {
    const request = createDatabaseRequest(db, [
      { paramName: "handle", isInput: true, value: handle },
    ]);
    const res = await executeProcedure("Chat.IsValidHandle", request);
    console.log("is valid res", res);
    return res.recordset[0].isValidHandle;
  });

export const getUserId =
  (name: string, isWeb3: boolean) => async (db: ConnectionPool) => {
    console.log("NAME", name);
    let res: any;
    let request: any;
    let query: string;
    if (isWeb3) {
      request = createDatabaseRequest(db, [
        { paramName: "ethereumAddress", isInput: true, value: name },
      ]);
      query = "SELECT * FROM Chat.FetchWeb3User(@ethereumAddress)";
    } else {
      request = createDatabaseRequest(db, [
        { paramName: "email", isInput: true, value: name },
      ]);
      query = "SELECT * FROM Chat.FetchEmailUser(@email)";
    }
    res = await executeFunction(query, request);
    console.log("USER ID", res);
    if (res.recordset.length > 0) return res.recordset[0].userId;
    return "";
  };

export const getFollow = (
  userHandle: string,
  followParam: "Followers" | "Following",
  params: PageProcedureParams
) =>
  useDB(async (db: ConnectionPool) => {
    const request = createDatabaseRequest(db, [
      { paramName: "userHandle", value: userHandle, isInput: true },
      { paramName: "page", value: params.page, isInput: true },
      { paramName: "queryUserId", value: params.queryUserId, isInput: true },
      {
        paramName: "createdDateTime",
        value: params.createdDateTime,
        isInput: true,
      },
    ]);

    const res = await executeProcedure(`Chat.Fetch${followParam}`, request);
    console.log("RES", res);
    return res.recordset;
  });

export const execFollowUser = (
  userId: number,
  followedUserId: number,
  followUser: number
) =>
  useDB(async (db) => {
    const request = createDatabaseRequest(db, [
      { paramName: "followedUserId", isInput: true, value: followedUserId },
      { paramName: "followerUserId", isInput: true, value: userId },
      { paramName: "follow", isInput: true, value: followUser },
    ]);
    await executeProcedure("Chat.FollowUser", request);
  });

export const fetchUserDetials = (userId: number) =>
  useDB(async (db) => {
    const request = createDatabaseRequest(db, [
      { paramName: "userId", isInput: true, value: userId },
    ]);
    const res = await executeFunction(
      "SELECT * FROM Chat.FetchUser(@userId)",
      request
    );
    if (res.recordset.length > 0) {
      return res.recordset[0];
    }
    throw new Error("No user found!");
  });

export const searchForUsers = (
  searchTerm: string,
  params: PageProcedureParams,
  userId?: number
) =>
  useDB(async (db) => {
    const request = createDatabaseRequest(
      db,
      appendPageParams(
        params,
        [
          { paramName: "searcher", isInput: true, value: userId },
          { paramName: "filter", isInput: true, value: searchTerm },
        ],
        false
      )
    );
    const res = await executeFunction(
      "SELECT * FROM Chat.FilterUsers(@searcher, @filter, @page, @createdDateTime)",
      request
    );
    return res.recordset;
  });

export const fetchUserProfileByHandle = (handle: string, userId?: number) =>
  useDB(async (db) => {
    const request = createDatabaseRequest(db, [
      { paramName: "handle", isInput: true, value: handle },
      { paramName: "queryUserId", isInput: true, value: userId },
    ]);

    const res = await executeProcedure("Chat.FetchUserDetails", request);
    if (res.recordset.length > 0) {
      return res.recordset[0];
    }
    return [];
  });

export const fetchUserAnalytics = (handle: string, userId?: number) =>
  useDB(async (db) => {
    const request = createDatabaseRequest(db, [
      { paramName: "userHandle", isInput: true, value: handle },
      { paramName: "queryUserId", isInput: true, value: userId },
    ]);
    const res = await executeProcedure("Chat.FetchUserStats", request);
    if (res.recordset.length > 0) return res.recordset[0];
    return res.recordset;
  });
