const express = require("express");
const router = express.Router();
const verifyToken = require("../Middlewares/authMiddleware");

const {createPost,updatePost,deletePost,getPostDetails,getAllPosts,getUserPosts} = require('../Controllers/postController')

//Create
router.post('/write',verifyToken,createPost)
// Update
router.put('/:id', verifyToken,updatePost);

// Delete
router.delete('/:id',verifyToken ,deletePost);

// Get Post details
router.get('/post/:id',getPostDetails);

// Get Posts
router.get('/', getAllPosts);

// Get user posts
router.get('/user/:userId', getUserPosts);



module.exports = router;
