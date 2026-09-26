const User = require('../models/userModel');
const Post = require('../models/postModel');
const bcrypt = require('bcrypt'); 

const updateUser = async (req, res) => {
    try {
        // Check if the user making the request is the same as the user to be updated
        if (req.userId !== req.params.id) {
            return res.status(403).json("You can only update your own account!");
        }

        if (!await User.findById(req.params.id)) {
            return res.status(404).json("No such user exists");
        }
        if (req.body.password) {
            const salt = await bcrypt.genSalt(10);
            req.body.password = await bcrypt.hash(req.body.password, salt);
        }
        const updatedUser = await User.updateById(req.params.id, req.body);
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

        const deletedUser = await User.deleteById(req.params.id);
        if (!deletedUser) {
            return res.status(404).json("No such user exists");
        }
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
        if (!await User.findById(req.userId)) {
            return res.status(404).json("User not found");
        }
        if (!await Post.findById(req.params.postId)) {
            return res.status(404).json("Post not found");
        }
        if (!await User.addBookmark(req.userId, req.params.postId)) {
            return res.status(400).json("Post already bookmarked!");
        }
        return res.status(200).json("Post bookmarked!");
    } catch (err) {
        return res.status(500).json({ message: 'Internal Server Error', error: err.message });
    }
};

const removeBookmark = async (req, res) => {
    
    try {
        if (!await User.removeBookmark(req.userId, req.params.postId)) {
            return res.status(400).json("Post not found in bookmarks!");
        }
        return res.status(200).json("Post removed from bookmarks!");
    } catch (err) {
        return res.status(500).json({ message: 'Internal Server Error', error: err.message });
    }
};

const addLike = async (req, res) => {
    try {
        if (!await Post.findById(req.params.postId)) {
            return res.status(404).json("Post not found");
        }
        if (!await User.addLike(req.userId, req.params.postId)) {
            return res.status(400).json("Post already Liked!");
        }
        return res.status(200).json("Post Liked!");
    } catch (err) {
        return res.status(500).json({ message: 'Internal Server Error', error: err.message });
    }
};

const removeLike = async (req, res) => {
    
    try {
        if (!await User.removeLike(req.userId, req.params.postId)) {
            return res.status(400).json("Post not found in likes!");
        }
        return res.status(200).json("Post removed from likes!");
    } catch (err) {
        return res.status(500).json({ message: 'Internal Server Error', error: err.message });
    }
};

const getAllBookmarks = async (req, res) => {
    try {
        if (!await User.findById(req.userId)) {
            return res.status(404).json({ message: 'User not found' });
        }
        return res.status(200).json(await User.getBookmarks(req.userId));
    } catch (err) {
        return res.status(500).json({ message: 'Internal Server Error', error: err.message });
    }
};



module.exports = { updateUser, deleteUser, getUser , addBookmark , removeBookmark,  getAllBookmarks , addLike, removeLike,};
