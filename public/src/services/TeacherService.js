const User = require("../models/User");
const Webinar = require("../models/Webinar");

const TeacherService = {
  async getTeacherById(teacherId) {
    return await User.findByPk(teacherId, {
      attributes: ["id", "full_name", "avatar", "bio"], // Include avatar and bio
      include: [
        {
          model: Webinar,
          as: "videos",
          attributes: ["id", "slug", "image_cover"], // Fetch webinars taught by the teacher
          required: false, // If no webinars exist, still return the teacher
        },
      ],
    });
  },
};

module.exports = TeacherService;
