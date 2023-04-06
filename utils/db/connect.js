const sql = require("mssql/msnodesqlv8");

const sqlConfig = {
  connectionString:
    "Driver={ODBC Driver 18 for SQL Server};Server=(localdb)\\MSSQLLocalDb;Database=ChatApplication;Trusted_Connection=yes;",
};

const query = "SELECT ethereumAddress FROM Chat.[User]";

const db = async () => {
  try {
    await sql.connect(sqlConfig);
    const res = await sql.query(query);
    console.log("Result", res);
  } catch (error) {
    console.log("error", error);
  }
};

db();
