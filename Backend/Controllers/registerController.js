const User = require('../models/userModel');
const bcrypt = require('bcrypt');

const register = async (req, res) => {
    try {
        const { username, rollNo, email, password } = req.body;
        const normalizedRollNo = rollNo.toLowerCase();
        const normalizedEmail = email.toLowerCase();

        const rollNoPattern = /^[0-9]{2}[Bb][8][1][Aa][0-9A-Za-z]{4}$/i;
        if (!rollNoPattern.test(normalizedRollNo)) {
            return res.status(400).json('Invalid roll number');
        }

        const emailPattern = new RegExp(`^${normalizedRollNo}@cvr.ac.in$`, 'i');
        if (!emailPattern.test(normalizedEmail)) {
            return res.status(400).json('Invalid email');
        }
        if (password.length < 8) {
            return res.status(400).json('Password must be atleast 8 characters long');
        }

        const exists = await User.findRegistrationConflict({
            rollNo: normalizedRollNo,
            email: normalizedEmail,
            username,
        });
        if (exists) {
            return res.status(400).json('User with this roll number or email or username already exists!');
        }

        await User.createUser({
            username,
            rollNo: normalizedRollNo,
            email: normalizedEmail,
            password: await bcrypt.hash(password, 10),
        });
        return res.status(201).json('User registered successfully!');
    } catch (err) {
        console.error('Error during user registration:', err);
        if (err.code === '23505') {
            return res.status(400).json('User with this roll number or email or username already exists!');
        }
        return res.status(500).json('Internal Server Error');
    }
};

module.exports = register;
