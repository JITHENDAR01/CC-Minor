const Post = require('../models/postModel');
const Comment = require('../models/commentModel');

const createComment = async (req, res) => {
    try {
        const postExists = await Post.findById(req.body.postId);
        if (!postExists) {
            return res.status(404).json("Post not found");
        }

        if (req.userId !== req.body.userId) {
            return res.status(403).json("You are not authorized to comment with this user ID");
        }
        
        const savedComment = await Comment.create({
            comment: req.body.comment,
            author: req.body.author,
            postId: req.body.postId,
            userId: req.userId,
        });
        return res.status(200).json(savedComment);
    } catch (err) {
        return res.status(500).json(err);
    }
};

const editComment = async (req, res) => {
    try {
        const comment = await Comment.findById(req.params.id);
        if (!comment) {
            return res.status(404).json("Comment not found");
        }
        if (comment.userId !== req.userId) {
            return res.status(403).json("You can only edit your own comment");
        }

        const updatedComment = await Comment.updateById(req.params.id, req.body);
        return res.status(200).json(updatedComment);
    } catch (err) {
        return res.status(500).json(err);
    }
};

const deleteComment = async (req, res) => {
    try {
        const comment = await Comment.findById(req.params.id);
        if (!comment) {
            return res.status(404).json("Comment not found");
        }
        if (comment.userId !== req.userId) {
            return res.status(403).json("You can only delete your own comment");
        }

        await Comment.deleteById(req.params.id);
        return res.status(200).json("Comment has been deleted!");
    } catch (err) {
        return res.status(500).json(err);
    }
};

const getPostComments = async (req, res) => {
    try {
        const comments = await Comment.findByPostId(req.params.postId);
        return res.status(200).json(comments);
    } catch (err) {
        return res.status(500).json(err);
    }
};

module.exports = { createComment, editComment, deleteComment, getPostComments };
