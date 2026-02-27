const { Sequelize } = require("sequelize");
require("dotenv").config();

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT || 4000,
    dialect: "mysql",
    logging: false,
    dialectOptions: {
      ssl: process.env.NODE_ENV === "production" ? {
        // TiDB requires SSL for serverless clusters
        require: true,
        rejectUnauthorized: true,
        // Adding minVersion can help with modern cloud handshakes
        minVersion: 'TLSv1.2'
      } : null
    },
  }
);

module.exports = sequelize;
