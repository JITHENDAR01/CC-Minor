const express=require('express')
const router=express.Router()
const verifyToken = require('../Middlewares/authMiddleware')
const {createComment,editComment,deleteComment,getPostComments} = require('../Controllers/commentController')


//CREATE
router.post("/create",verifyToken,createComment)

//UPDATE
router.put("/:id",verifyToken,editComment)


//DELETE
router.delete("/:id",verifyToken,deleteComment)


//GET POST COMMENTS
router.get("/post/:postId",getPostComments)


module.exports=router