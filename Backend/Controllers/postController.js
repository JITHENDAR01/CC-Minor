const User = require('../models/userModel');
const Post = require('../models/postModel');
const Comment = require('../models/commentModel');
const bcrypt = require('bcrypt');

const createPost = async (req,res)=>{
    try{
        const newPost = new Post(req.body)
        const savedPost = await newPost.save()
        res.status(200).json(savedPost)
    }
    catch(err){
        res.status(200).json(err)
    }
}

const updatePost = async (req, res) => {
    try {
        const idToUpdate = await Post.findById(req.params.id);
        if (!idToUpdate) {
            return res.status(404).json("No such Post exists");
        }

        const updatedPost = await Post.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true });
        return res.status(200).json(updatedPost);
    } catch (err) {
        return res.status(500).json(err);
    }
}

const deletePost = async (req, res) => {
    try {
        const deletedPost= await Post.findByIdAndDelete(req.params.id);
        if (!deletedPost) {
            return res.status(404).json("No such Posts exists");
        }
        
        await Comment.deleteMany({ userId: req.params.id });
        return res.status(200).json("Post has been deleted successfully");
    } catch (err) {
        return res.status(500).json(err);
    }
}

const getPostDetails =  async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        if (!post) {
            return res.status(404).json("No such Post exists");
        }
        return res.status(200).json(post);
    } catch (err) {
        return res.status(500).json(err);
    }
}

const getAllPosts = async (req, res) => {
    const query = req.query;

    try {
        const searchFilter = {
            $or: [
                { title: { $regex: query.search, $options: "i" } }, 
                { categories: { $regex: query.search, $options: "i" } } 
            ]
        };

        const posts = await Post.find(query.search ? searchFilter : {});

        if (posts.length === 0) {
            return res.status(404).json("No posts found");
        }

        return res.status(200).json(posts);
    } catch (err) {
        return res.status(500).json(err);
    }
};


const getUserPosts = async (req, res) => {
    try {
        const posts = await Post.find({userId:req.params.userId});
        if (!posts) {
            return res.status(404).json("No Posts exists");
        }
        return res.status(200).json(posts);
    } catch (err) {
        return res.status(500).json(err);
    }
}
module.exports={createPost,updatePost,deletePost,getPostDetails,getAllPosts , getUserPosts};