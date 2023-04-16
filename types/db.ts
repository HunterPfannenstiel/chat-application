import {
  ConnectionPool,
  ISqlTypeFactoryWithNoParams,
  ISqlTypeWithLength,
} from "mssql";

type InputData = {
  paramName: string;
  isInput: true;
  value: any;
};

type OutputData = {
  paramName: string;
  isInput: false;
  outputType: ISqlTypeFactoryWithNoParams | ISqlTypeWithLength;
};
export type ProcedureParam = InputData | OutputData;

export type DBDelegate = (db: ConnectionPool) => Promise<any>;
