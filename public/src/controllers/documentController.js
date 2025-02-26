const documentService = require("../services/documentService");

const getAllDocuments = async (req, res) => {
  try {

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

    if (!manuel_id) {
      return res.status(400).json({ error: "manuel_id est requis." });
    }

    const documents = await documentService.getDocumentsByManuel(manuel_id);

    res.status(200).json(documents);
  } catch (error) {
    console.error(`❌ Erreur lors de la récupération des documents pour manuel_id ${req.params.manuel_id}:`, error.message);
    res.status(500).json({ error: "Erreur lors de la récupération des documents du manuel." });
  }
};

const createDocument = async (req, res) => {
  try {

    if (!req.body.name || !req.body.pdf || !req.body.manuel_id) {
      return res.status(400).json({ error: "Les champs name, pdf et manuel_id sont requis." });
    }

    const document = await documentService.createDocument(req.body);
    res.status(201).json({ message: "Document ajouté avec succès", document });
  } catch (error) {
    console.error("❌ Erreur lors de l'ajout du document :", error.message);
    res.status(500).json({ error: "Erreur lors de l'ajout du document." });
  }
};
// 🆕 New function to fetch the correction video URL
const getCorrectionVideoUrl = async (req, res) => {
  try {
    const { manuel_id, icon, page } = req.params;

    if (!manuel_id || !icon || !page) {
      return res.status(400).json({ error: "manuel_id, icon, and page are required." });
    }

    const url = await documentService.getCorrectionVideoUrl(manuel_id, icon, page);
    res.status(200).json({ correctionVideoUrl: url });
  } catch (error) {
    console.error("❌ Error fetching correction video URL:", error.message);
    res.status(500).json({ error: "Failed to retrieve correction video URL." });
  }
};

module.exports = {
  getAllDocuments,
  getDocumentsByManuel,
  createDocument,
  getCorrectionVideoUrl,
};
