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

module.exports = {
  getAllDocuments,
  getDocumentsByManuel,
  createDocument,
};
