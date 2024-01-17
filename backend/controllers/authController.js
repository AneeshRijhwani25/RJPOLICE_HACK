const authService = require('../services/authService');

const register = async (req, res) => {
  try {
    console.log(req.body)
    const { name, phoneNo, adharNumber, email, password } = req.body;

    // Validation checks
    if (!name || !phoneNo || !adharNumber || !email || !password) {
      throw new Error("All fields are required");
    }

    await authService.isValidAadhaar(adharNumber);

  
    const emailValidator = /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/;
    if (!emailValidator.test(email)) {
      throw new Error("Invalid email format");
    }

    const phoneValidator = /^\d{10}$/;
    if (!phoneValidator.test(phoneNo)) {
      throw new Error("Invalid phone number format");
    }

    if (password.length < 8) {
      throw new Error("Password must be at least 8 characters long");
    }

    const userId = await authService.registerUser(
      name, phoneNo, adharNumber, email, password
    );
    return res.status(201).json({
      message: "User registered successfully",
      data: { userId }
    });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ error: error.message });
  }
};



const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const token = await authService.loginUser(email, password);
    if (!token) return res.status(401).json({ message: 'Invalid credentials' });
    res.setHeader('Authorization', `Bearer ${token}`);
    res.status(200).json({ token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

module.exports = {
  register,
  login,
};
