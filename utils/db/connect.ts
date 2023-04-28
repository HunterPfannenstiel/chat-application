import sql from "mssql";
import { ConnectionPool } from "mssql";

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
