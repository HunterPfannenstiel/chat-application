const sql = require("msnodesqlv8");

const connnection =
  "server=(localdb)\\MSSQLLocalDb;Database=ChatApplication;Trusted_Connection=Yes;Driver={OBDC Driver 18 for SQL Server}";

const query = "SELECT ethereumAddress FROM Chat.[User]";

sql.query(connnection, query, (err, rows) => {
  if (err) {
    console.log("err", err);
  } else {
    console.log("Rows", rows);
  }
});
