const enfantService = require("../services/enfantService");
const Enfant = require("../models/Enfant");
const User = require("../models/User");

// ✅ Ajouter un enfant
exports.addEnfant = async (req, res) => {
  try {
    const { Nom, prenom, sexe, level_id } = req.body;
    const parentId = req.user.id; // L'ID du parent est extrait du token

    if (!Nom || !sexe || !level_id) {
      return res.status(400).json({ error: "Tous les champs sont requis." });
    }

    // Vérifier le nombre d'enfants déjà créés
    const childCount = await Enfant.count({ where: { parent_id: parentId } });
    if (childCount >= 4) {
      return res.status(400).json({ error: "Vous avez atteint le nombre maximum d'enfants autorisés (4)." });
    }

    const newEnfant = await Enfant.create({
      Nom,
      prenom: prenom || null,
      sexe,
      level_id,
      parent_id: parentId,
    });

    return res.status(201).json({
      message: "Enfant ajouté avec succès.",
      enfant: newEnfant,
    });
  } catch (error) {
    console.error("Erreur lors de l'ajout de l'enfant:", error.message);
    return res.status(500).json({ error: "Erreur interne du serveur." });
  }
};

// ✅ Modifier un enfant
exports.updateEnfant = async (req, res) => {
  try {
    const { id } = req.params;
    const { Nom, prenom, sexe, level_id } = req.body;
    const parentId = req.user.id;

    // Vérification de l'existence de l'enfant
    const enfant = await Enfant.findOne({ where: { id, parent_id: parentId } });

    if (!enfant) {
      return res.status(404).json({ error: "Enfant non trouvé ou n'appartient pas à ce parent." });
    }

    await enfant.update({ Nom, prenom, sexe, level_id });

    return res.json({
      message: "Enfant mis à jour avec succès.",
      enfant,
    });
  } catch (error) {
    console.error("Erreur lors de la mise à jour:", error.message);
    return res.status(500).json({ error: "Erreur interne du serveur." });
  }
};

// ✅ Supprimer un enfant
exports.deleteEnfant = async (req, res) => {
  try {
    const { id } = req.params;
    const parentId = req.user.id;

    // Vérification de l'existence de l'enfant
    const enfant = await Enfant.findOne({ where: { id, parent_id: parentId } });

    if (!enfant) {
      return res.status(404).json({ error: "Enfant non trouvé ou n'appartient pas à ce parent." });
    }

    await enfant.destroy();

    return res.json({ message: "Enfant supprimé avec succès." });
  } catch (error) {
    console.error("Erreur lors de la suppression:", error.message);
    return res.status(500).json({ error: "Erreur interne du serveur." });
  }
};












// exports.createEnfant = async (req, res) => {
//     try {
//       const authUser = req.user; // L'utilisateur doit être récupéré du middleware
  
//       if (!authUser) {
//         return res.status(404).json({ error: "Utilisateur non trouvé." });
//       }
  
//       const { nom, sexe, level_id } = req.body;
  
//       if (!nom || !sexe || !level_id) {
//         return res.status(400).json({ error: "Tous les champs sont requis." });
//       }
  
//       const newEnfant = await enfantService.createEnfant(authUser, { nom, sexe, level_id });
//       return res.status(201).json(newEnfant);
//     } catch (error) {
//       return res.status(500).json({ error: error.message });
//     }
//   };