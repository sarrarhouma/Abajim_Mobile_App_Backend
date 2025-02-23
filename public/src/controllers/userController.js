const userService = require("../services/userService");

/**
 * ✅ Inscription d'un utilisateur
 */
const register = async (req, res) => {
  try {
    const { full_name, mobile, password, role_id } = req.body;

    if (!full_name || !mobile || !password || !role_id) {
      return res.status(400).json({ error: "Tous les champs sont requis." });
    }

    const result = await userService.registerUser({ full_name, mobile, password, role_id });

    res.status(201).json(result);
  } catch (error) {
    console.error("❌ Erreur lors de l'inscription:", error.message);
    res.status(500).json({ error: error.message });
  }
};

/**
 * ✅ Connexion d'un utilisateur
 */
const login = async (req, res) => {
  try {
    const { mobile, password } = req.body;

    if (!mobile || !password) {
      console.log("🚨 Champs requis manquants !");
      return res.status(400).json({ error: "Mobile et mot de passe sont requis." });
    }

    const result = await userService.loginUser(mobile, password);
    res.status(200).json(result);
  } catch (error) {
    console.error("❌ Erreur lors de la connexion :", error.message);
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  register,
  login,
};
