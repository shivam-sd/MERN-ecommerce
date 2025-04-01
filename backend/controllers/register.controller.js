const userModel = require("../models/user.model");
const bcrypt = require("bcrypt");

const RegisterController = async (req, res) => {
  const { name, email, phone, password } = req.body;

  try {
    // Check if user already exists
    const ifUserExist = await userModel.findOne({ email });
    if (ifUserExist) {
      return res.status(409).json({ errors: "User already exists..." });
    }

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create new user
    const user = await userModel.create({
      name,
      email,
      phone,
      password: hashedPassword,
    });

    return res.status(201).json({ message: "User Successfully Registered", user });

  } catch (err) {
    console.error("Error in RegisterController:", err);
    return res.status(400).json({ errors: "Error In Register User", details: err.message });
  }
};

module.exports = RegisterController;
