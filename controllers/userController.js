const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const User = require("../models/User");

// POST: Allow user to create a new account
const signup = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // Check if the user with the same email already exists
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({
        status: false,
        message: "User with this email already exists",
      });
    }

    // Hash the password before saving it
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const user = new User({
      username,
      email,
      password: hashedPassword,
    });

    await user.save();

    res
      .status(201)
      .json({ status: true, message: "User created successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ status: false, message: "Internal server error" });
  }
};

// POST: Allow user to access the system
const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find the user by email
    const user = await User.findOne({ email });

    if (!user) {
      return res
        .status(401)
        .json({ status: false, message: "Invalid username or password" });
    }

    // Compare the provided password with the hashed password in the database
    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return res
        .status(401)
        .json({ status: false, message: "Invalid username or password" });
    }

    res.status(200).json({
      status: true,
      username: user.username,
      message: "User logged in successfully",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ status: false, message: "Internal server error" });
  }
};

module.exports = {
  signup,
  login,
};