const Webinar = require("../models/Webinar");
const User = require("../models/User");

const WebinarService = {
  // Create a new webinar
  async create(data) {
    return await Webinar.create(data);
  },
  // Get all webinars (with teacher full_name)
  async getById(id) {
    return await Webinar.findByPk(id, {
      include: [
        {
          model: User,
          as: "teacher",
          attributes: ["id", "full_name", "avatar", "bio"], // Fetch name, avatar, and bio
        },
      ],
    });
  },

  // Get all webinars
  async getAll() {
    return await Webinar.findAll({
      include: [
        {
          model: User,
          as: "teacher",
          attributes: ["id", "full_name", "avatar", "bio"],
        },
      ],
    });
  },

  // Get webinars by level
  async getByLevelId(levelId) {
    return await Webinar.findAll({
      where: { level_id: levelId },
      include: [
        {
          model: User,
          as: "teacher",
          attributes: ["id", "full_name", "avatar", "bio"],
        },
      ],
    });
  },
};

module.exports = WebinarService;
