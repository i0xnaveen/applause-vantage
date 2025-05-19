const { Sequelize } = require("sequelize");

const sequelizeConnection = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: "mysql",
  }
);

const User = require("../models/users.model")(sequelizeConnection);

module.exports = {
  sequelizeConnection,
  User,
};
