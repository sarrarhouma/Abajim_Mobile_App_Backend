const User = require("../models/User");
const Webinar = require("../models/Webinar");

const TeacherService = {
  async getTeacherById(teacherId) {
    return await User.findByPk(teacherId, {
      attributes: [
        "id",
        "full_name",
        "avatar",
        "bio",
        "about",
        "address",
        "cover_img",
        "avatar_settings",
        "language",
        "school_id",
        "section_id",
        "level_id",
      ],
      include: [
        {
          model: Webinar,
          as: "videos",
          attributes: ["id", "slug", "image_cover", "status", "created_at"],
          required: false,
        },
      ],
    });
  },
};

module.exports = TeacherService;


