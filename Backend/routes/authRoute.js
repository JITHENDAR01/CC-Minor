const express = require('express');
const router = express.Router()
const login = require('../Controllers/loginController')
const register = require('../Controllers/registerController')
const logout = require('../Controllers/logoutController')
const verifyToken = require('../Middlewares/authMiddleware')
const User = require('../models/userModel'); 

/* const User = require('../models/userModel')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken') */

const jwt = require('jsonwebtoken')
require('dotenv').config();

//Register

router.post('/register',register)

//Login
router.post('/login',login);


//LOGOUT 
router.post("/logout",logout)



//Refetch user
router.get("/refetch", verifyToken, async (req, res) => {
    try {
        // Fetch the full user data from the database using the userId from the JWT
        const user = await User.findById(req.userId).select('-password').populate('bookmarks');
        if (!user) {
            return res.status(404).json({ message: 'User not found.' });
        }
        
        // Send the full user data including bookmarks to the frontend
        console.log(user);
        res.status(200).json(user);
    } catch (error) {
        console.error('Error fetching user data:', error);
        res.status(500).json({ message: 'Internal server error.' });
    }
});

module.exports = router;