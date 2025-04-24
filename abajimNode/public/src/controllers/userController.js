const userService = require('../services/userService');

// Register new user
const register = async (req, res) => {
 
  try {
    const { full_name, mobile, password, role_id } = req.body;
    if (!full_name || !mobile || !password || !role_id) {
      return res.status(400).json({ error: 'All fields are required.' });
    }

    const user = await userService.registerUser(req.body);
    res.status(201).json({ message: 'User registered successfully.', user });
  } catch (error) {
    console.error('Error registering user:', error.message);
    res.status(500).json({ error: 'An error occurred while registering the user.' });
  }
};

// User login
const login = async (req, res) => {
  try {
    // Simple validation of required fields
    const { mobile, password } = req.body;
    if (!mobile || !password) {
      return res.status(400).json({ error: 'Mobile and password are required.' });
    }

    // Call service to log in the user
    const result = await userService.loginUser(mobile, password); // FIXED: Used mobile instead of mobile
    res.status(200).json(result);
  } catch (error) {
    console.error('Error logging in user:', error.message);
    res.status(500).json({ error: 'An error occurred while logging in the user.' });
  }
};

module.exports = {
  register,
  login,
};
