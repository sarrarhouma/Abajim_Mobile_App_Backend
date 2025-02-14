const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

const SECRET_KEY = process.env.JWT_SECRET || "your_secret_key";

// ✅ Enregistrer un nouvel utilisateur
const registerUser = async (data) => {
  try {
    const { full_name, mobile, password, role_id } = data;

    // Vérifier si l'utilisateur existe déjà
    const existingUser = await User.findOne({ where: { mobile } });
    if (existingUser) throw new Error("Un utilisateur avec ce numéro existe déjà.");

    // Hasher le mot de passe
    const hashedPassword = await bcrypt.hash(password, 10);

    // Créer l'utilisateur
    const newUser = await User.create({
      full_name,
      mobile,
      password: hashedPassword,
      role_id,
      status: "active",
    });

    console.log("✅ Utilisateur créé:", newUser.id);
    return newUser;
  } catch (error) {
    console.error("❌ Erreur dans registerUser:", error.message);
    throw new Error("Échec de l'inscription.");
  }
};

// ✅ Connexion de l'utilisateur
const loginUser = async (mobile, password) => {
  try {
    // Vérifier si l'utilisateur existe
    const user = await User.findOne({ where: { mobile } });
    if (!user) throw new Error("Numéro de mobile ou mot de passe incorrect.");

    // Comparer les mots de passe
    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) throw new Error("Numéro de mobile ou mot de passe incorrect.");

    // Générer un token JWT
    const token = jwt.sign(
      { id: user.id, mobile: user.mobile },
      SECRET_KEY,
      { expiresIn: "24h" }
    );

    console.log(`✅ Token généré pour l'utilisateur ${user.id}:`, token);

    // Retourner les informations de l'utilisateur et le token
    return { token, user };
  } catch (error) {
    console.error("❌ Erreur dans loginUser:", error.message);
    throw new Error("Échec de la connexion.");
  }
};

module.exports = {
  registerUser,
  loginUser,
};
