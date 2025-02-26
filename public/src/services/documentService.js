const Document = require("../models/Document");

const getAllDocuments = async () => {
    try {
      return await Document.findAll();
    } catch (error) {
      console.error("❌ Erreur lors de la récupération des documents :", error.message);
      throw error;
    }
  };

const getDocumentsByManuel = async (manuelId) => {
  return await Document.findAll({ where: { manuel_id: manuelId } });
};

const createDocument = async (data) => {
  return await Document.create({
    name: data.name,
    nombre_page: data.nombre_page,
    pdf: data.pdf,
    manuel_id: data.manuel_id,
    "3d_path_teacher": data["3d_path_teacher"],
    "pathenfant": data["pathenfant"],
  });
};
// 🆕 Function to generate the correction video URL
const getCorrectionVideoUrl = async (manuelId, icon, page) => {
  try {
    if (!manuelId || !icon || !page) {
      throw new Error("manuel_id, icon, and page are required.");
    }

    // Construct the correction video URL dynamically
    const correctionVideoUrl = `https://www.abajim.com/panel/scolaire/${manuelId}?icon=${icon}&page=${page}`;
    return correctionVideoUrl;
  } catch (error) {
    console.error("❌ Error fetching correction video URL:", error.message);
    throw error;
  }
};
module.exports = {
  getAllDocuments,
  getDocumentsByManuel,
  createDocument,
  getCorrectionVideoUrl,
};
