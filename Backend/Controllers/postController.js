const Post = require('../models/postModel');

const createPost = async (req, res) => {
    try {
        const savedPost = await Post.create(req.body);
        return res.status(201).json(savedPost);
    } catch (err) {
        return res.status(500).json(err);
    }
};

const updatePost = async (req, res) => {
    try {
        const updatedPost = await Post.updateById(req.params.id, req.body);
        if (!updatedPost) {
            return res.status(404).json("No such Post exists");
        }
        return res.status(200).json(updatedPost);
    } catch (err) {
        return res.status(500).json(err);
    }
}

const deletePost = async (req, res) => {
    try {
        const deletedPost = await Post.deleteById(req.params.id);
        if (!deletedPost) {
            return res.status(404).json("No such Posts exists");
        }
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
    try {
        const posts = await Post.findAll(req.query.search);
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
        const posts = await Post.findByUserId(req.params.userId);
        if (posts.length === 0) {
            return res.status(404).json("No Posts exists");
        }
        return res.status(200).json(posts);
    } catch (err) {
        return res.status(500).json(err);
    }
}
module.exports = { createPost, updatePost, deletePost, getPostDetails, getAllPosts, getUserPosts };