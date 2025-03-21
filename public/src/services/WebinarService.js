const { Op } = require("sequelize");
const Webinar = require("../models/Webinar");
const User = require("../models/User");
const WebinarChapter = require("../models/WebinarChapter");
const File = require("../models/File");
const FileTranslation = require("../models/FileTranslation");

const WebinarService = {
  // ✅ Récupérer un webinar par ID avec tous les détails
  async getById(id) {
    return await Webinar.findByPk(id, {
      include: [
        {
          model: User,
          as: "teacher",
          attributes: ["id", "full_name", "avatar", "bio"],
        },
        {
          model: WebinarChapter,
          as: "chapters",
          include: [
            {
              model: File,
              as: "files",
              include: [
                {
                  model: FileTranslation,
                  as: "translations",
                  where: { locale: "ar" },
                  required: false,
                  attributes: ["title"]
                }
              ]
            }
          ]
        }
      ]
    });
  },

  // ✅ Tous les webinars avec prof
  async getAll() {
    return await Webinar.findAll({
      include: [
        {
          model: User,
          as: "teacher",
          attributes: ["id", "full_name", "avatar", "bio"]
        }
      ]
    });
  },

  // ✅ Webinars par niveau
  async getByLevelId(levelId) {
    return await Webinar.findAll({
      where: { level_id: levelId },
      include: [
        {
          model: User,
          as: "teacher",
          attributes: ["id", "full_name", "avatar", "bio"]
        },
        {
          model: WebinarChapter,
          as: "chapters",
          include: [
            {
              model: File,
              as: "files",
              include: [
                {
                  model: FileTranslation,
                  as: "translations",
                  where: { locale: "ar" },
                  required: false,
                  attributes: ["title"]
                }
              ]
            }
          ]
        }
      ]
    });
  },

  // ✅ Recherche par slug ou nom du prof
  searchWebinars: async (query, levelId) => {
    return await Webinar.findAll({
      where: {
        level_id: levelId,
        [Op.or]: [
          { slug: { [Op.like]: `%${query}%` } },
          { '$teacher.full_name$': { [Op.like]: `%${query}%` } }
        ]
      },
      include: [
        {
          model: User,
          as: "teacher",
          attributes: ["id", "full_name", "avatar", "bio"]
        }
      ]
    });
  }
};

module.exports = WebinarService;
