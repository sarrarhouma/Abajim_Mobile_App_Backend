const User = require("../models/User");
const Enfant = require("../models/Enfant");
const SchoolLevel = require("../models/SchoolLevel");

const garconImages = [
    "/images/avatars/boy1.jpeg",
    "/images/avatars/boy2.jpeg",
    "/images/avatars/f14.png",
    "/images/avatars/f16.png"
  ];
  
  const filleImages = [
    "/images/avatars/girl1.jpeg",
    "/images/avatars/girl2.jpeg",
    "/images/avatars/girl3.jpeg",
    "/images/avatars/girl4.jpeg"
  ];
  

exports.createEnfant = async (authUser, data) => {
  try {
    const parentId = authUser.role_name === "enfant" ? authUser.organ_id : authUser.id;

    // Vérifier le nombre d'enfants déjà créés
    const childCount = await Enfant.count({ where: { parent_id: parentId } });

    if (childCount >= 4) {
      throw new Error("Vous avez atteint le nombre maximum d'enfants autorisés (4).");
    }

    // Vérifier si le niveau scolaire existe
    const schoolLevel = await SchoolLevel.findByPk(data.level_id);
    if (!schoolLevel) {
      throw new Error("Le niveau scolaire spécifié n'existe pas.");
    }

    // Sélection d'un avatar aléatoire en fonction du sexe
    if (!["Garçon", "Fille"].includes(data.sexe)) {
      throw new Error("Le sexe doit être 'Garçon' ou 'Fille'.");
    }    
    const imagePool = data.sexe === "Garçon" ? garconImages : filleImages;
    const avatar = imagePool[Math.floor(Math.random() * imagePool.length)];

    // 📌 Étape 1 : Créer un utilisateur enfant dans `users`
    const newUser = await User.create({
        full_name: data.Nom,
        role_name: "enfant",
        role_id: 8,
        level_id: data.level_id,
        section_id: schoolLevel.id,
        status: "active",
        organ_id: parentId,
        avatar,
        verified: 1,
        language: "AR",
        financial_approval: 0,
        created_at: new Date(),
      });
      
    // 📌 Étape 2 : Créer l'enfant dans `enfant` et l'associer à `user_id`
    const newEnfant = await Enfant.create({
        Nom: data.om,
        prenom: data.prenom || "",  // Assurez-vous que prenom existe ou est vide
        sexe: data.sexe,
        level_id: data.level_id,
        parent_id: parentId,
        user_id: newUser.id,  // Ajout de l'user_id
        path: avatar,  // Ajout de l'avatar
        created_at: new Date(),
      });

    return { user: newUser, enfant: newEnfant };
  } catch (error) {
    throw new Error(error.message || "Une erreur est survenue lors de la création de l'enfant.");
  }
};


// const User = require("../models/User");
// const Enfant = require("../models/Enfant");
// const SchoolLevel = require("../models/SchoolLevel");

// const garconImages = ["/boy1.jpeg", "/boy2.jpeg", "/f14.png", "/f16.png"];
// const filleImages = ["/girl1.jpeg", "/girl2.jpeg", "/girl3.jpeg", "/girl4.jpeg"];

// exports.createEnfant = async (authUser, data) => {
//   try {
//     const parentId = authUser.role_name === "enfant" ? authUser.organ_id : authUser.id;

//     // Vérifier le nombre d'enfants déjà créés
//     const childCount = await Enfant.count({ where: { parent_id: parentId } });

//     if (childCount >= 4) {
//       throw new Error("Vous avez atteint le nombre maximum d'enfants autorisés (4).");
//     }

//     // Vérifier si le niveau scolaire existe
//     const schoolLevel = await SchoolLevel.findByPk(data.level_id);
//     if (!schoolLevel) {
//       throw new Error("Le niveau scolaire spécifié n'existe pas.");
//     }

//     // Vérification du sexe
//     if (!["Garçon", "Fille"].includes(data.sexe)) {
//       throw new Error("Le sexe doit être 'Garçon' ou 'Fille'.");
//     }

//     const imagePool = data.sexe === "Garçon" ? garconImages : filleImages;
//     const avatar = imagePool[Math.floor(Math.random() * imagePool.length)];

//     // Création de l'enregistrement dans la table Enfant
//     const newEnfant = await Enfant.create({
//         Nom: data.Nom,
//       prenom: data.prenom || null,
//       sexe: data.sexe,
//       level_id: data.level_id,
//       parent_id: parentId,
//       user_id: authUser.id,
//       path: avatar,
//       created_at: new Date(),
//     });

//     return newEnfant;
//   } catch (error) {
//     throw new Error(error.message || "Une erreur est survenue lors de la création de l'enfant.");
//   }
// };
