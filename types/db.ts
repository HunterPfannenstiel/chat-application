import { ISqlType } from "mssql";

type InputData = {
  paramName: string;
  isInput: true;
  value: any;
};

type OutputData = {
  paramName: string;
  isInput: false;
  outputType: ISqlType;
};
export type ProcedureParam = InputData | OutputData;
