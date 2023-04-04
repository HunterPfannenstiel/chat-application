const sql = require("msnodesqlv8");

const connnection =
  "Server=(localdb)\\MSSQLLocalDb;Database=ChatApplication;Trusted_Connection=Yes;Driver={MS Access Database}";

const query = "SELECT ethereumAddress FROM Chat.[User]";

sql.query(connnection, query, (err, rows) => {
  if (err) {
    console.log("err", err);
  } else {
    console.log("Rows", rows);
  }
});
