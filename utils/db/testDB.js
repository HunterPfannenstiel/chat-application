const sql = require("mssql/msnodesqlv8");

const sqlConfig = {
  connectionString:
    "Driver={ODBC Driver 18 for SQL Server};Server=(localdb)\\MSSQLLocalDb;Database=ChatApplication;Trusted_Connection=yes;",
  server: "(localdb)\\MSSQLLocalDb",
};

const query = "SELECT ethereumAddress FROM Chat.[User]";

const getDB = async () => {
  try {
    const pool = new sql.ConnectionPool(sqlConfig);
    const connection = await pool.connect();
    const res = (await connection.query(query)).recordset;
    console.log("RES", res);
    connection.release();
  } catch (error) {
    console.log("error", error);
    throw error;
  }
};

getDB();
