const { Pool } = require("pg");
const dbConfig = require("../config/db.config");
const Sequelize = require("sequelize");

const pool = new Pool();

pool.on("error", (err, client) => {
  console.error("Unexpected error on idle client", err);
  process.exit(-1);
});

pool.on("connect", (err, client) => {
  if (err) console.error(err);
  console.log("Successfully connected to postgres.");
});
/* dbConfig.USER,
  dbConfig.PASSWORD, operatorsAliases: false,*/
const sequelize = new Sequelize(process.env.DATABASE_URL, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  port: 5432,
  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle,
  },
});
const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;
console.log("process.env.DATABASE_URL >>> " + process.env.DATABASE_URL);
console.log("process.env.API_KEY >>> " + process.env.API_KEY);
alert(process.env.API_KEY);
db.idassists = require("./idAssist.model.js")(sequelize, Sequelize);
module.exports = db;
