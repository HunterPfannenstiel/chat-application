import sql from "mssql";
import { ConnectionPool } from "mssql";

const connectionString =
  process.env.NODE_ENV === "production"
    ? process.env.DB_CONNECTION
    : "Driver={ODBC Driver 17 for SQL Server};Server=(localdb)\\MSSQLLocalDb;Database=ChatApplication;Trusted_Connection=yes;";
console.log("Conn string", process.env.DB_CONNECTION);
const sqlConfig = {
  connectionString: process.env.DB_CONNECTION,
  server: "chat-application-db.database.windows.net",
  driver: "msnodesqlv8",
  database: "master",
  user: "monkmonk",
  password: "Knomknom!",
  options: {
    encrypt: true,
  },
};
//"(localdb)\\MSSQLLocalDb"

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
