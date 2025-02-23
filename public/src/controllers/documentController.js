const documentService = require("../services/documentService");

const getAllDocuments = async (req, res) => {
  try {
   // console.log("📌 Tentative de récupération de tous les documents...");

    const documents = await documentService.getAllDocuments();

   // console.log("✅ Documents récupérés avec succès :", documents);
    res.status(200).json(documents);
  } catch (error) {
    console.error("❌ Erreur lors de la récupération des documents :", error.message);
    res.status(500).json({ error: "Erreur lors de la récupération des documents." });
  }
};

const getDocumentsByManuel = async (req, res) => {
  try {
    const { manuel_id } = req.params;
    //console.log(`📌 Récupération des documents pour manuel_id: ${manuel_id}`);

    if (!manuel_id) {
      return res.status(400).json({ error: "manuel_id est requis." });
    }

    const documents = await documentService.getDocumentsByManuel(manuel_id);

    console.log(`✅ Documents du manuel ${manuel_id} récupérés:`, documents);
    res.status(200).json(documents);
  } catch (error) {
    console.error(`❌ Erreur lors de la récupération des documents pour manuel_id ${req.params.manuel_id}:`, error.message);
    res.status(500).json({ error: "Erreur lors de la récupération des documents du manuel." });
  }
};

const createDocument = async (req, res) => {
  try {
    console.log("📌 Tentative d'ajout d'un nouveau document avec les données :", req.body);

    if (!req.body.name || !req.body.pdf || !req.body.manuel_id) {
      return res.status(400).json({ error: "Les champs name, pdf et manuel_id sont requis." });
    }

    const document = await documentService.createDocument(req.body);

    console.log("✅ Document ajouté avec succès :", document);
    res.status(201).json({ message: "Document ajouté avec succès", document });
  } catch (error) {
    console.error("❌ Erreur lors de l'ajout du document :", error.message);
    res.status(500).json({ error: "Erreur lors de l'ajout du document." });
  }
};

module.exports = {
  getAllDocuments,
  getDocumentsByManuel,
  createDocument,
};
