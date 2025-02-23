const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

const SECRET_KEY = process.env.JWT_SECRET || "your_secret_key";

/**
 * ✅ Enregistrer un nouvel utilisateur
 */
const registerUser = async (data) => {
  try {
    const { full_name, mobile, password, role_id } = data;

    // 📌 Vérifier si l'utilisateur existe déjà
    const existingUser = await User.findOne({ where: { mobile } });
    if (existingUser) throw new Error("Un utilisateur avec ce numéro existe déjà.");


    const hashedPassword = await bcrypt.hash(password, 10);


    // 📌 Création de l'utilisateur
    const newUser = await User.create({
      full_name,
      mobile,
      password: hashedPassword,
      role_id,
      status: "active",
    });

    console.log("✅ Utilisateur créé:", newUser.id);

    // 📌 Génération du Token JWT
    const token = jwt.sign(
      { id: newUser.id, role_id: newUser.role_id },
      SECRET_KEY,
      { expiresIn: "24h" }
    );

    console.log("✅ User registered successfully:", token);

    return { token, user: newUser };
  } catch (error) {
    console.error("❌ Erreur dans registerUser:", error.message);
    throw new Error("Échec de l'inscription.");
  }
};

/**
 * ✅ Connexion de l'utilisateur
 */
const loginUser = async (mobile, password) => {
  try {


    // 📌 Étape 1: Vérifier si l'utilisateur existe
    const user = await User.findOne({ where: { mobile } });

    if (!user) {

      throw new Error("Numéro de mobile ou mot de passe incorrect.");
    }


    // 📌 Étape 2: Vérifier si le mot de passe est correct
    console.log("🔄 Comparaison du mot de passe...");
    console.log("📌 Mot de passe entré:", password);


    const isValid = await bcrypt.compare(password, user.password);

    if (!isValid) {
      console.log("❌ Mot de passe incorrect !");
      throw new Error("Numéro de mobile ou mot de passe incorrect.");
    }

    console.log("🟢 Mot de passe valide !");

    // 📌 Étape 3: Générer un token JWT
    const token = jwt.sign(
      { id: user.id, role_id: user.role_id },
      SECRET_KEY,
      { expiresIn: "24h" }
    );

    console.log(`✅ Token généré pour l'utilisateur ${user.id}: ${token}`);

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
