const User = require('../models/userModel')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken') 

const logout = async (req,res)=>{
    try{
        res.status(200).json("User logged out successfully!")
    }
    catch(err){
        res.status(500).json(err)
    }
}

module.exports = logout