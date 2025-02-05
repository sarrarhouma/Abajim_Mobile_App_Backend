const { Sequelize } = require("sequelize");
const dotenv = require("dotenv");

dotenv.config(); // Load environment variables

// Create a Sequelize instance with MySQL connection details
const sequelize = new Sequelize({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  dialect: "mysql", // Ensure you're using the correct dialect for MySQL
  logging: false, // Set to true if you want to see SQL queries in the console
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
