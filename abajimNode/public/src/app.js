const express = require("express");
const dotenv = require("dotenv");
const db = require("./config/db");
const userRoutes = require("./routes/auth");

dotenv.config();

const app = express();


// Middleware to parse JSON request body
app.use(express.json());  // This must be before your routes!

// Utiliser les routes des utilisateurs
app.use('/api/users', userRoutes); // Assurez-vous que le préfixe est correct
// Add your routes here
app.get("/", (req, res) => {
    res.send("Welcome to the Abajim app!");
});

module.exports = app; // Ensure you're exporting the app instance
