const express = require("express");
const TeacherController = require("../controllers/TeacherController");

const router = express.Router();

// Route to get a teacher by their ID
router.get("/:id", TeacherController.getTeacherById);

module.exports = router;
