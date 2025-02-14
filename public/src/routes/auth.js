const express = require('express');
const userController = require('../controllers/userController');
const { validateRegistration } = require('../config/middleware/validationMiddleware');
const { sendOTP, verifyOTP, resetPassword } = require('../controllers/authController');

const router = express.Router();


router.post('/register', validateRegistration, userController.register);
router.post('/login', userController.login);

// OTP & Password Reset
router.post('/send-otp', sendOTP);
router.post('/verify-otp', verifyOTP);
router.post('/reset-password', resetPassword);

module.exports = router;
