// registerController.js
const User = require('../models/userModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const register = async (req, res) => {
  try {
    const { username, rollNo, email, password } = req.body;

    // Normalize case for rollNo and email
    const normalizedRollNo = rollNo.toLowerCase();
    const normalizedEmail = email.toLowerCase();

    // Validate roll number format
    const rollNoPattern = /^[0-9]{2}[Bb][8][1][Aa][0-9A-Za-z]{4}$/i;
    if (!rollNoPattern.test(normalizedRollNo)) {
      return res.status(400).json("Invalid roll number");
    }

    // Validate email format
    const emailPattern = new RegExp(`^${normalizedRollNo}@cvr.ac.in$`, 'i');
    if (!emailPattern.test(normalizedEmail)) {
      return res.status(400).json("Invalid email");
    }

    // Validate password length
    if (password.length < 8) {
      return res.status(400).json("Password must be atleast 8 characters long");
    }

    // Check if user already exists
    const existingUser = await User.findOne({ $or: [{ rollNo: normalizedRollNo }, { email: normalizedEmail },{username:username}] });
    if (existingUser) {
      return res.status(400).json("User with this roll number or email or username already exists!");
    }

    // Create new user
    const newUser = new User({
      username:username,
      rollNo: normalizedRollNo,
      email: normalizedEmail,
      password: await bcrypt.hash(password, 10),
    });

    await newUser.save();
    res.status(201).json("User registered successfully!");

  } catch (err) {
    console.error("Error during user registration:", err);
    res.status(500).json("Internal Server Error");
  }
};

module.exports = register;
