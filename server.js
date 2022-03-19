process.env.NODE_ENV != "production" ? require("dotenv").config() : null;

const express = require("express");
const path = require("path");
const app = express();

app.use(express.json({ extended: false }));
app.use(express.urlencoded({ extended: false }));

app.use(express.static(__dirname + "/dist/id-assist"));

var cookieParser = require("cookie-parser");

app.use(cookieParser());

require("./src/app/routes/idassist.routes")(app);

const db = require("./src/app/models");
db.sequelize.sync();

/* db.sequelize.sync({ force: true }).then(() => {
  console.log("Drop and re-sync db.");
}); */

app.get("/*", function (req, res) {
  res.sendFile(path.join(__dirname + "/dist/id-assist/index.html"));
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
