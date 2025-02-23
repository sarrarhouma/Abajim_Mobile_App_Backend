const userService = require("../services/userService");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const Enfant = require("../models/Enfant");
const SchoolLevel = require("../models/SchoolLevel");


//Register new user

// const register = async (req, res) => {
//   console.log('Request body:', req.body); // Log request body for debugging
//   try {
//     const { full_name, mobile, password, role_id } = req.body;
//     if (!full_name || !mobile || !password || !role_id) {
//       console.log('Missing required fields:', req.body);
//       return res.status(400).json({ error: 'All fields are required.' });
//     }

//     const user = await userService.registerUser(req.body);
//     res.status(201).json({ message: 'User registered successfully.', user });
//   } catch (error) {
//     console.error('Error registering user:', error.message);
//     res.status(500).json({ error: 'An error occurred while registering the user.' });
//   }
// };
const register = async (req, res) => {
  console.log("📨 Received Register Request:", req.body); // Log request for debugging

  try {
    const { full_name, mobile, password, role_id } = req.body;

    // ✅ Vérification des champs obligatoires
    if (!full_name || !mobile || !password || !role_id) {
    //  console.log("⚠️ Missing required fields:", req.body);
      return res.status(400).json({ error: "All fields are required." });
    }

    // ✅ Vérifier si l'utilisateur existe déjà
    const existingUser = await User.findOne({ where: { mobile } });
    if (existingUser) {
      return res.status(400).json({ error: "User already exists with this mobile number." });
    }

    // 🔐 Hachage du mot de passe
    const hashedPassword = await bcrypt.hash(password, 10);

    // ✅ Création de l'utilisateur via userService
    const newUser = await userService.registerUser({
      full_name,
      mobile,
      password: hashedPassword,
      role_id,
    });

    // 🔐 Génération du Token JWT
    const token = jwt.sign(
      { id: newUser.id, role_id: newUser.role_id },
      process.env.JWT_SECRET,
      { expiresIn: "7d" } // Expiration du token après 7 jours
    );

  //  console.log("✅ User registered successfully:", newUser);
    console.log("✅ User registered successfully:", token);

    // 📤 Retourner l'utilisateur avec le token
    return res.status(201).json({
      message: "User registered successfully.",
      user: newUser,
      access_token: token, // ✅ Retourner le token immédiatement
    });

  } catch (error) {
    console.error("❌ Error registering user:", error.message);
    return res.status(500).json({ error: "An error occurred while registering the user." });
  }
};


const JWT_SECRET = process.env.JWT_SECRET || "your_secret_key";

// const register = async (req, res) => {
//   try {
//     console.log("🚀 Requête reçue pour l'inscription:", req.body);

//     const { full_name, email, password, nom, sexe, level_id } = req.body;

//     // Vérifier si le JWT_SECRET est bien défini
//     if (!JWT_SECRET) {
//       console.error("❌ ERREUR: La clé JWT_SECRET est manquante !");
//       return res.status(500).json({ error: "Erreur serveur: JWT_SECRET non défini." });
//     }

//     // Vérification si l'utilisateur existe déjà
//     const existingUser = await User.findOne({ where: { email } });
//     if (existingUser) {
//       console.log("⚠️ Utilisateur déjà existant:", existingUser.email);
//       return res.status(400).json({ error: "Cet email est déjà utilisé." });
//     }

//     console.log("🔑 Hashing du mot de passe...");
//     const hashedPassword = await bcrypt.hash(password, 10);

//     console.log("🆕 Création de l'utilisateur...");
//     const newUser = await User.create({
//       full_name,
//       email,
//       password: hashedPassword,
//       role_name: "parent",
//       role_id: 7, // Assumant que 7 = parent
//       status: "active",
//     });

//     console.log("✅ Utilisateur créé avec ID:", newUser.id);

//     let enfant = null;

//     if (nom && sexe && level_id) {
//       console.log("👶 Création de l'enfant...");
//       enfant = await Enfant.create({
//         nom,
//         sexe,
//         level_id,
//         parent_id: newUser.id, // L'enfant est bien lié au parent
//         user_id: newUser.id,   // Associer aussi le user_id
//       });
//       console.log("✅ Enfant créé avec succès");
//     }

  //   console.log("🔑 Génération du token...");
  //   const token = jwt.sign({ id: newUser.id }, JWT_SECRET, { expiresIn: "24h" });

  //   console.log(`✅ Token généré avec succès: ${token}`);

  //   return res.status(201).json({
  //     message: "Utilisateur enregistré avec succès",
  //     user: newUser,
  //     enfant,
  //     token,
  //   });
  // } catch (error) {
  //   console.error("❌ Erreur lors de l'inscription:", error);
  //   return res.status(500).json({ error: "Erreur interne du serveur.", details: error.message });
  // }
// };

// ✅ Login
// User login
const login = async (req, res) => {
  try {
    const { mobile, password } = req.body;
    
    console.log("🟢 Requête reçue pour LOGIN :", { mobile, password });

    if (!mobile || !password) {
      console.log("🚨 Champs requis manquants !");
      return res.status(400).json({ error: "Mobile et mot de passe sont requis." });
    }

    const result = await userService.loginUser(mobile, password);

    console.log("✅ Utilisateur connecté avec succès :", result);
    res.status(200).json(result);

  } catch (error) {
    console.error("❌ Erreur lors de la connexion :", error);
    res.status(500).json({ error: error.message });
  }
};


module.exports = {
  register,
  login,
};
