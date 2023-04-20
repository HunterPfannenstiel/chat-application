import { CreateUser } from "@_types/user";
import {
  createDatabaseRequest,
  executeFunction,
  executeProcedure,
  useDB,
} from "./helpers";
import sql, { ConnectionPool } from "mssql/msnodesqlv8";
import { ProcedureParam } from "@_types/db";

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

export const isValidHandle = (handle: string) =>
  useDB(async (db) => {
    const request = createDatabaseRequest(db, [
      { paramName: "handle", isInput: true, value: handle },
    ]);
    const res = await executeFunction(
      "SELECT * FROM Chat.IsValidHandle(@handle)",
      request
    );

    console.log("is valid res", res);
    return res.recordset[0];
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

export const getFollow =
  (userHandle: string, page: number, followParam: "Followers" | "Following") =>
  async (db: ConnectionPool) => {
    const request = createDatabaseRequest(db, [
      { paramName: "userHandle", value: userHandle, isInput: true },
      { paramName: "page", value: page, isInput: true },
    ]);

    const res = await executeProcedure(`Chat.Fetch${followParam}`, request);
    console.log("RES", res);
    return res.recordset;
  };
