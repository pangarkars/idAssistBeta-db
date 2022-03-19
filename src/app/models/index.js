const { Pool } = require("pg");
const dbConfig = require("../config/db.config");
const Sequelize = require("sequelize");
//const { Sequelize } = require("sequelize");

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
  ssl: {
    rejectUnauthorized: false,
  },
});
const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;
db.idassists = require("./idAssist.model.js")(sequelize, Sequelize);
module.exports = db;
