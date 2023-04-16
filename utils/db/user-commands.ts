import { CreateUser } from "@_types/user";
import { createProcedureRequest, executeProcedure } from "./helpers";
import sql, { ConnectionPool } from "mssql/msnodesqlv8";
import { ProcedureParam } from "@_types/db";
import { getDB } from "./connect";

export const execCreateUser = async (
  db: ConnectionPool,
  profile: CreateUser
) => {
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
  const request = createProcedureRequest(db, params);
  const res = await executeProcedure("Chat.CreateUser", request);
  return res.output.userId as number;
};

export const isValidHandle = (handle: string) => async (db: ConnectionPool) => {
  const res = await db.query(`SELECT Chat.IsValidHandle(${handle})`);
  console.log("is valid res", res);
  return res.output;
};

export const getUserId =
  (name: string, isWeb3: boolean) => async (db: ConnectionPool) => {
    const query = isWeb3
      ? `SELECT * FROM Chat.FetchWeb3User('${name}')`
      : `SELECT * FROM Chat.FetchEmailUser('${name}')`;
    const res = await db.query(query);
    if (res.recordset.length > 0) return res.recordset[0].userId;
    return "";
  };
