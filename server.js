process.env.NODE_ENV != "production" ? require("dotenv").config() : null;

console.log("process.env.NODE_ENV >>> " + process.env.NODE_ENV);
console.log("process.env.database url >>> " + process.env.DATABASE_URL);
const express = require("express");
const path = require("path");
const app = express();

app.use(express.json({ extended: false }));
app.use(express.urlencoded({ extended: false }));

app.use(express.static(__dirname + "/dist/id-assist"));

var cookieParser = require("cookie-parser");

app.use(cookieParser());

//require("./src/server/database");

require("./src/app/routes/idassist.routes")(app);

console.log("will sync db");

const db = require("./src/app/models");
console.log(db);
db.sequelize.sync();

console.log("db sync done");

app.get("/*", function (req, res) {
  res.sendFile(path.join(__dirname + "/dist/id-assist/index.html"));
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
