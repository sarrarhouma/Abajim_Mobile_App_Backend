const jwt = require("jsonwebtoken");
const User = require("../../models/User");
const JWT_SECRET = process.env.JWT_SECRET || "your_secret_key"; 

// Middleware pour vérifier l'authentification avec un token JWT

const authenticateToken = async (req, res, next) => {
  try {
    //console.log("🛠️ Checking authentication...");

    // ✅ Extract token
    const token = req.header("Authorization")?.replace("Bearer ", "");
    console.log("🔍 Extracted Token:", token); // 🔥 Debugging log

    if (!token) {
      return res.status(403).json({ error: "Accès refusé, token manquant !" });
    }

    // ✅ Decode token
    const decoded = jwt.verify(token, JWT_SECRET);
    //console.log("🔑 Decoded Token:", decoded); // 🔥 Debugging log

    // ✅ Fetch user from database
    const user = await User.findByPk(decoded.id);
    if (!user) {
      return res.status(404).json({ error: "Utilisateur non trouvé." });
    }

    // ✅ Convert Sequelize model to plain object
    req.user = {
      id: user.id,
      role_id: user.role_id,
      full_name: user.full_name,
    };

   // console.log("✅ Authenticated User:", req.user); // 🔥 Debugging log

    next();
  } catch (error) {
    console.error("❌ Authentication Error:", error.message);
    return res.status(401).json({ error: "Token invalide ou expiré." });
  }
};

module.exports = authenticateToken;
