const { Sequelize } = require("sequelize");
const dotenv = require("dotenv");

dotenv.config(); 

// Create a Sequelize instance with MySQL connection details
const sequelize = new Sequelize({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  dialect: "mysql", 
  logging: false, 
});
// Check the database connection
sequelize.authenticate()
  .then(() => {
    console.log("✅ Database connection established successfully!");
  })
  .catch((err) => {
    console.error("❌ Database connection failed:", err.message);
  });
module.exports = sequelize;
