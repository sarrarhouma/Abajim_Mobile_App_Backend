const { Op } = require("sequelize");
const Webinar = require("../models/Webinar");
const User = require("../models/User");
const WebinarChapter = require("../models/WebinarChapter");
const File = require("../models/File");
const FileTranslation = require("../models/FileTranslation");
const WebinarTranslation = require("../models/WebinarTranslation");
const NotificationService = require('./NotificationService');

const WebinarService = {
  // ✅ Récupérer un webinar par ID avec tous les détails
  async getById(id) {
    return await Webinar.findByPk(id, {
      include: [
        {
          model: WebinarTranslation,
          as: "translations",
          where: { locale: "ar" },
          required: false,
          attributes: ["title"]
        },
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
          model: WebinarTranslation,
          as: "translations",
          where: { locale: "ar" },
          required: false,
          attributes: ["title"]
        },
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
          model: WebinarTranslation,
          as: "translations",
          where: { locale: "ar" },
          required: false,
          attributes: ["title"]
        },
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

  // ✅ Recherche par title (webinarTranslations), slug ou nom du prof
  async searchByKeyword(levelId, keyword) {
    return await Webinar.findAll({
      where: {
        level_id: levelId,
        [Op.or]: [
          { slug: { [Op.like]: `%${keyword}%` } },
          { '$teacher.full_name$': { [Op.like]: `%${keyword}%` } },
          { '$translations.title$': { [Op.like]: `%${keyword}%` } },
        ]
      },
      include: [
        {
          model: WebinarTranslation,
          as: "translations",
          where: { locale: "ar" },
          required: false,
          attributes: ["title"]
        },
        {
          model: User,
          as: "teacher",
          attributes: ["id", "full_name", "avatar", "bio"]
        }
      ]
    });
  },
};
// Lors de la création d'un nouveau webinar
async function notifyNewWebinar(webinar) {
  const teacherId = webinar.teacher_id;

  // 🧠 Trouver les parents abonnés à ce prof
  const subscribers = await User.findAll({
    where: { role_id: 3 }, // 👨‍👩‍👧‍👦 Les parents
    include: [
      {
        model: Favorite,
        as: "favorites",
        where: { webinar_id: webinar.id },
        required: false,
      }
    ]
  });

  for (const parent of subscribers) {
    await NotificationService.sendNotification({
      user_id: parent.id,
      title: "📚 جديد : دورة مباشرة متاحة",
      message: `تم نشر دورة جديدة من قبل ${webinar.teacher.full_name}.`,
      data: { webinarId: webinar.id },
    });
  }
}

module.exports = WebinarService;
