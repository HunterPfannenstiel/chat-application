const sql = require("mssql/msnodesqlv8");

const sqlConfig = {
  connectionString:
    "Driver={ODBC Driver 18 for SQL Server};Server=(localdb)\\MSSQLLocalDb;Database=ChatApplication;Trusted_Connection=yes;",
  server: "(localdb)\\MSSQLLocalDb",
};

const query = "SELECT ethereumAddress FROM Chat.[User]";

export const getDB = async () => {
  try {
    await sql.connect(sqlConfig);
    return sql;
  } catch (error) {
    console.log("error", error);
    throw error;
  }
};

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
