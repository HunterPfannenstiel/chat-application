import { MAX } from "mssql/msnodesqlv8";
import { createProcedureRequest, executeProcedure } from "./helpers";
import { ProcedureParam } from "@_types/db";
import sql from "mssql/msnodesqlv8";
import { getDB } from "./connect";
import { UserFeed } from "@_types/user";

export const execFetchFeed = async (userId: number) => {
  const db = await getDB();
  const params: ProcedureParam[] = [
    { paramName: "userId", isInput: true, value: userId },
  ];
  const request = createProcedureRequest(db, params);
  const res = await executeProcedure("Chat.FetchFeed", request);
  return res.recordset[0];
};
