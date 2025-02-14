const jwt = require("jsonwebtoken");
const User = require("../../models/User");
const JWT_SECRET = process.env.JWT_SECRET || "your_secret_key"; 

// Middleware pour vérifier l'authentification avec un token JWT
const authenticateToken = async (req, res, next) => {
  try {
    // Récupérer le token dans le header Authorization
    const token = req.header("Authorization")?.replace("Bearer ", "");

    if (!token) {
      return res.status(403).json({ error: "Accès refusé, token manquant !" });
    }

    // Vérifier et décoder le token
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded; // Ajoute les infos utilisateur à la requête

    // Optionnel : Vérifier si l'utilisateur existe réellement dans la base de données
    const user = await User.findByPk(decoded.id);
    if (!user) {
      return res.status(404).json({ error: "Utilisateur non trouvé." });
    }

    req.user = user; // Attacher les infos utilisateur à la requête

    next(); // Passer au prochain middleware ou au contrôleur
  } catch (error) {
    return res.status(401).json({ error: "Token invalide ou expiré." });
  }
};

module.exports = authenticateToken;
