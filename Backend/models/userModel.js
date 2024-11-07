const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  rollNo: {
    type: String,
    required: true,
    unique: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true,
  },
  bookmarks: {
    type: [mongoose.Schema.Types.ObjectId], // Assuming IDs are ObjectId
    ref: 'Posts',
    default : [],
    required: false,
  },
  likes: {
    type: [mongoose.Schema.Types.ObjectId], // Assuming IDs are ObjectId
    ref: 'Posts',
    default : [],
    required: false,
  },
}, { timestamps: true });

userSchema.index({ rollNo: 1 }, { unique: true, collation: { locale: 'en', strength: 2 } });
userSchema.index({ email: 1 }, { unique: true, collation: { locale: 'en', strength: 2 } });

const Users = mongoose.model('Users', userSchema);

module.exports = Users;
