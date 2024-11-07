const express = require("express");
const router = express.Router();
const verifyToken = require('../Middlewares/authMiddleware')
const {updateUser,deleteUser,getUser,addBookmark,removeBookmark,getAllBookmarks , addLike, removeLike} = require('../Controllers/userController')

/* const User = require('../models/userModel');
const Post = require('../models/postModel');
const Comment = require('../models/commentModel');

const bcrypt = require('bcrypt');  */


// Update
router.put('/:id', verifyToken ,updateUser);

// Delete
router.delete('/:id', verifyToken, deleteUser);

// Get user
router.post("/addBookmark/:postId",verifyToken,addBookmark);

router.post("/removeBookmark/:postId",verifyToken,removeBookmark);

router.post("/addLike/:postId",verifyToken, addLike) ;

router.post("/removeLike/:postId",verifyToken, removeLike) ;

router.get("/getAllBookmarks/",verifyToken,getAllBookmarks);

router.get('/:id', getUser);


module.exports = router;
