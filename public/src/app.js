const express = require("express");
const dotenv = require("dotenv");
const path = require("path");
const userRoutes = require("./routes/auth");
const enfantRoutes = require("./routes/enfantRoutes"); 
const manuelRoutes = require("./routes/manuels.js"); 
const sequelize = require("./config/db");  
const User = require("./models/User");
const Enfant = require("./models/Enfant");
const Manuel = require("./models/Manuel");


dotenv.config();

const app = express();

// Middleware pour parser le JSON
app.use(express.json());

//app.use("/images", express.static(path.join(__dirname, "public/images")));

// Routes API
app.use("/api/users", userRoutes);
app.use("/api/enfants", enfantRoutes);
app.use("/api/manuels", manuelRoutes);
// Route de base
app.get("/", (req, res) => {
    res.send("Welcome to the Abajim app!");
});

// Synchronisation de la base de données
sequelize.sync()
  .then(() => console.log("✅ Synchronisation réussie"))
  .catch((err) => console.error("❌ Erreur de synchronisation :", err));


module.exports = app;
