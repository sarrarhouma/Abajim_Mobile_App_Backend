// ✅ WebinarService.js
const { Op } = require("sequelize");
const Webinar = require("../models/Webinar");
const User = require("../models/User");
const WebinarChapter = require("../models/WebinarChapter");
const File = require("../models/File");
const FileTranslation = require("../models/FileTranslation");

const WebinarService = {
  // Create a new webinar
  // async create(data) {
  //   return await Webinar.create(data);
  // },

  // Get webinar by ID with teacher, chapters, files, and translations
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

  // Get all webinars with teacher only
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

  // Get webinars by level_id
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
  }
};

module.exports = WebinarService;