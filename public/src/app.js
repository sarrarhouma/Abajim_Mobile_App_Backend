const express = require("express");
const dotenv = require("dotenv");
const path = require("path");
const userRoutes = require("./routes/auth");
const enfantRoutes = require("./routes/enfantRoutes"); 
const documentRoutes = require("./routes/documentRoutes"); 
const manuelRoutes = require("./routes/manuels.js"); 
const webinarRoutes = require("./routes/webinarRoutes.js");
const likeRoutes = require("./routes/likeRoutes.js");  // ✅ Added missing Like routes
const followRoutes = require("./routes/followRoutes");
const teacherRoutes = require("./routes/teacherRoutes");
const notificationRoutes = require("./routes/notificationRoutes");
const sequelize = require("./config/db");  
const User = require("./models/User");
const Enfant = require("./models/Enfant");
const Manuel = require("./models/Manuel");
const videoRoutes = require("./routes/videoRoutes");
const meetingRoutes = require('./routes/meetingRoutes');
const saleRoutes = require('./routes/saleRoutes');


dotenv.config();

const app = express();

// Middleware pour parser le JSON
app.use(express.json());

// Routes API
// ✅ Add the User routes
app.use("/api/users", userRoutes);
// ✅ Add the Enfant routes
app.use("/api/enfants", enfantRoutes);
// ✅ Add the Manuel routes
app.use("/api/manuels", manuelRoutes);
// ✅ Add the Document routes
app.use("/api/documents", documentRoutes);
// ✅ Add the Webinar routes
app.use("/api/webinars", webinarRoutes);
// ✅ Add the Like routes
app.use("/api/likes", likeRoutes); 
// ✅ Add the Follow routes
app.use("/api/follows", followRoutes);
// ✅ Add the Teacher routes
app.use("/api/teachers", teacherRoutes);
// ✅ Add the Notification routes
app.use("/api/notifications", notificationRoutes); 
// ✅ Add the Video routes 
app.use("/api/videos", videoRoutes);
// ✅ Add the Meeting routes
app.use('/api/meetings', meetingRoutes);
app.use('/api/sales', saleRoutes);



// ✅ Fix: Correct the static path to serve `/avatars`
const imagesPath = path.join(__dirname, "public/images");

app.use("/images", express.static(imagesPath));  // ✅ Serve static files from "public/images"
  // ✅ Serve static files from the correct directory




// Route de base
app.get("/", (req, res) => {
    res.send("Welcome to the Abajim app!");
});

// Synchronisation de la base de données
sequelize.sync()
  .then(() => console.log("✅ Synchronisation réussie"))
  .catch((err) => console.error("❌ Erreur de synchronisation :", err));


module.exports = app;
