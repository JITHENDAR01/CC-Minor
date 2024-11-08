const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  photo: {
    type: String,
    required: false,
  },
  username:{
    type: String,
    required:true
  },
  userId:{
    type: String,
    required:true
  },
  categories:{
    type: Array,
    required:false
  }
}, { timestamps: true });

const Posts = mongoose.model('Posts', postSchema);

module.exports = Posts;
