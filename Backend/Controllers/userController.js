const User = require('../models/userModel');
const Post = require('../models/postModel');
const Comment = require('../models/commentModel');
const bcrypt = require('bcrypt'); 
const mongoose = require('mongoose');
const Posts = require('../models/postModel');

const updateUser = async (req, res) => {
    try {
        // Check if the user making the request is the same as the user to be updated
        if (req.userId !== req.params.id) {
            return res.status(403).json("You can only update your own account!");
        }

        const idToUpdate = await User.findById(req.params.id);
        if (!idToUpdate) {
            return res.status(404).json("No such user exists");
        }
        if (req.body.password) {
            const salt = await bcrypt.genSalt(10);
            req.body.password = await bcrypt.hash(req.body.password, salt);
        }
        const updatedUser = await User.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true });
        return res.status(200).json(updatedUser);
    } catch (err) {
        return res.status(500).json(err);
    }
}

const deleteUser = async (req, res) => {
    try {
        // Check if the user making the request is the same as the user to be deleted
        if (req.userId !== req.params.id) {
            return res.status(403).json("You can only delete your own account!");
        }

        const deletedUser = await User.findByIdAndDelete(req.params.id);
        if (!deletedUser) {
            return res.status(404).json("No such user exists");
        }
        await Post.deleteMany({ userId: req.params.id });
        await Comment.deleteMany({ userId: req.params.id });
        return res.status(200).json("User deleted successfully");
    } catch (err) {
        return res.status(500).json(err);
    }
}

const getUser = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) {
            return res.status(404).json("No such user exists");
        }
        return res.status(200).json(user);
    } catch (err) {
        return res.status(500).json(err);
    }
}

// Add a bookmark

const addBookmark = async (req, res) => {
    try {
        const user = await User.findById(req.userId);
        const postId = req.params.postId; // Cast to ObjectId

        if (!user.bookmarks.includes(postId)) {
            user.bookmarks.push(postId);
            await user.save();
            return res.status(200).json("Post bookmarked!");
        }
        res.status(400).json("Post already bookmarked!");
    } catch (err) {
        console.error('Error in addBookmark:', err.message);
        console.error('Stack Trace:', err.stack);
        res.status(500).json({ message: 'Internal Server Error', error: err.message });
    }
};

const removeBookmark = async (req, res) => {
    
    try {
        const user = await User.findById(req.userId);
        const postId = req.params.postId; // Cast to ObjectId

        if (user.bookmarks.includes(postId)) {
            user.bookmarks.pull(postId);
            await user.save();
            return res.status(200).json("Post removed from bookmarks!");
        }
        res.status(400).json("Post not found in bookmarks!");
    } catch (err) {
        console.error('Error in removeBookmark:', err.message);
        console.error('Stack Trace:', err.stack);
        res.status(500).json({ message: 'Internal Server Error', error: err.message });
    }
};

const addLike = async (req, res) => {
    //console.log("inside")
    try {
        const user = await User.findById(req.userId);
        //console.log(typeof req.params)
        const postId = req.params.postId; // Cast to ObjectId
        //console.log(user);
        console.log(postId);
        if (!user.likes.includes(postId)) {
            user.likes.push(postId);
            await user.save();
            return res.status(200).json("Post Liked!");
        }
        res.status(400).json("Post already Liked!");
    } catch (err) {
        console.error('Error in AddLike:', err.message);
        console.error('Stack Trace:', err.stack);
        res.status(500).json({ message: 'Internal Server Error', error: err.message });
    }
};

const removeLike = async (req, res) => {
    
    try {
        const user = await User.findById(req.userId);
        const postId = req.params.postId; // Cast to ObjectId
        console.log(user)
        if (user.likes.includes(postId)) {
            user.likes.pull(postId);
            await user.save();
            return res.status(200).json("Post removed from likes!");
        }
        res.status(400).json("Post not found in likes!");
    } catch (err) {
        console.error('Error in removeLike:', err.message);
        console.error('Stack Trace:', err.stack);
        res.status(500).json({ message: 'Internal Server Error', error: err.message });
    }
};

const getAllBookmarks = async (req, res) => {
    try {
        const user = await User.findById(req.userId).populate('bookmarks');
        //console.log(user)
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json(user.bookmarks);
    } catch (err) {
        console.error('Error in getAllBookmarks:', err.message);
        console.error('Stack Trace:', err.stack);
        res.status(500).json({ message: 'Internal Server Error', error: err.message });
    }
};



module.exports = { updateUser, deleteUser, getUser , addBookmark , removeBookmark,  getAllBookmarks , addLike, removeLike,};
