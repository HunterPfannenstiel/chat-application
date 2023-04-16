const sql = require("mssql/msnodesqlv8");

const sqlConfig = {
  connectionString:
    "Driver={ODBC Driver 17 for SQL Server};Server=(localdb)\\MSSQLLocalDb;Database=ChatApplication;Trusted_Connection=yes;",
  server: "(localdb)\\MSSQLLocalDb",
  driver: "msnodesqlv8",
};

const getDB = async () => {
  try {
    const pool = new sql.ConnectionPool(sqlConfig);
    const connection = await pool.connect();
    const res = await connection
      .request()
      .input("userId", sql.Int, 1)
      .input("page", sql.Int, 0)
      .query("SELECT * FROM Chat.FetchFollowing(@userId, @page)");
    console.log("RES", res);
    connection.release();
  } catch (error) {
    console.log("error", error);
    throw error;
  }
};

getDB();
