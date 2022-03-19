const { Pool } = require("pg");

const pool = new Pool(process.env.DATABASE_URL);
console.log("process.env.DATABASE_URL" + process.env.DATABASE_URL);
pool.on("error", (err, client) => {
  console.error("Unexpected error on idle client", err);
  process.exit(-1);
});

pool.on("connect", (err, client) => {
  if (err) console.error(err);
  console.log(client);
  console.log("Successfully connected to postgres.");
});

const { Sequelize } = require("sequelize");

const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialect: "postgres",
  host: "localhost",
  port: 5432,
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
  ssl: {
    rejectUnauthorized: false,
  },
});

module.exports = sequelize;
