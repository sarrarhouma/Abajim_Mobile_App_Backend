const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const SECRET_KEY = process.env.JWT_SECRET_KEY || 'your_secret_key';
const payload = {
    // Add your payload data here
  };
  
  const token = jwt.sign(payload, SECRET_KEY, { expiresIn: '24h' });
  console.log('Generated JWT Token:', token);

// Register a new user
const registerUser = async (data) => {
  try {
    const { full_name, mobile, password, role_id } = data;

    // Check if user already exists
    const existingUser = await User.findOne({ where: { mobile } });
    if (existingUser) throw new Error('User with this mobile number already exists.');

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create the new user
    const newUser = await User.create({
      full_name,
      mobile,
      password: hashedPassword,
      role_id,
      status: 'active',
    });

    return newUser;
  } catch (error) {
    console.error('Error in registerUser:', error.message);
    throw new Error( error.message);
  }
};

// Log in the user
const loginUser = async (mobile, password) => {
  try {
    // Find the user by mobile
    const user = await User.findOne({ where: { mobile } });
    if (!user) throw new Error('Invalid mobile or password.');

    // Compare passwords
    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) throw new Error('Invalid mobile or password.');

    // Generate JWT token
    const token = jwt.sign(
      { id: user.id, mobile: user.mobile },
      SECRET_KEY,
      { expiresIn: '24h' } // Token valid for 24 hours
    );

    // Return user and token
    return { token, user };
  } catch (error) {
    console.error('Error in loginUser:', error.message);
    throw new Error(error.message);
  }
};

module.exports = {
  registerUser,
  loginUser,
};
