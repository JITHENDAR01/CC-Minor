const User = require('../models/userModel')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
require('dotenv').config();

const login = async(req,res)=>{
    try{
        const user = await User.findOne({email:req.body.email})
        if(!user){
            return res.status(404).json('User not found!')
        }
        const match = await bcrypt.compare(req.body.password,user.password);
        if(!match){
            return res.status(401).json("Wrong credentials")
        }
        const token = jwt.sign({_id: user._id, username: user.username, email: user.email }, process.env.SECRET_KEY, { expiresIn: "1h" });
        const { password, ...info } = user._doc;
        res.status(200).json({ ...info, token });
    }
    catch(err){
        res.status(500).json(err);
    }
}

module.exports = login; 
