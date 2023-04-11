import sql from "mssql/msnodesqlv8";
import { ConnectionPool } from "mssql";
const sqlConfig = {
  connectionString:
    "Driver={ODBC Driver 17 for SQL Server};Server=(localdb)\\MSSQLLocalDb;Database=ChatApplication;Trusted_Connection=yes;",
  server: "(localdb)\\MSSQLLocalDb",
  driver: "msnodesqlv8",
};

const query = "SELECT ethereumAddress FROM Chat.[User]";
export const getDB = async () => {
  try {
    const pool: ConnectionPool = new sql.ConnectionPool(sqlConfig);
    const connection = await pool.connect();
    return connection;
    // connection.release();
  } catch (error) {
    console.log("error", error);
    throw error;
  }
};

// export const getDB = async () => {
//   try {
//     await sql.connect(sqlConfig);

//     return sql;
//   } catch (error) {
//     console.log("error", error);
//     throw error;
//   }
// };

// db();
// -----------------------

// const sql = require("mssql/msnodesqlv8");

// const sqlConfig = {
//   connectionString:
//     "Driver={ODBC Driver 18 for SQL Server};Server=(localdb)\\MSSQLLocalDb;Database=ChatApplication;Trusted_Connection=yes;",
// };
// export const getDB = async () => {
//   const pool = new sql.ConnectionPool(sqlConfig);
//   const connection = await pool.connect();
//   return connection;
// };
