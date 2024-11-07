const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
  comment: {
    type: String,
    required: true,
  },
  author: {
    type: String,
    required: true,
  },
  postId: {
    type: String,
    required: true,
  },
  userId:{
    type: String,
    required:true
  }
}, { timestamps: true });

const Comments = mongoose.model('Comments', commentSchema);

module.exports = Comments;
