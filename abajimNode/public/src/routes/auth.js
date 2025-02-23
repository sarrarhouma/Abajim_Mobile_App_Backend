const express = require('express');
const userController = require('../controllers/userController');
const { validateRegistration } = require('../config/middleware/validationMiddleware');

const router = express.Router();


router.post('/register', validateRegistration, userController.register);
router.post('/login', userController.login);

module.exports = router;
