import sql from "mssql/msnodesqlv8";
import { ConnectionPool } from "mssql";
const sqlConfig = {
  connectionString:
    "Driver={ODBC Driver 17 for SQL Server};Server=(localdb)\\MSSQLLocalDb;Database=ChatApplication;Trusted_Connection=yes;",
  server: "(localdb)\\MSSQLLocalDb",
  driver: "msnodesqlv8",
};

export const getDB = async () => {
  try {
    const pool: ConnectionPool = new sql.ConnectionPool(sqlConfig);
    const connection = await pool.connect();
    return connection;
  } catch (error) {
    console.log("error", error);
    throw error;
  }
};
