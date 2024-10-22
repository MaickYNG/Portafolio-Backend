const mongoose = require ("mongoose")

const UserSchema = new mongoose.Schema({
    username: {
      type: String,
      require: true,
      trim: true,
    },
    password: {
      type: String,
      require: true,
      trim: true,
    },
    fullname: {
      type: String,
      require: true,
      trim: true,
    },
    status: {
      type: Boolean,
      require: true,
      default: true,
    },
  });
  
  module.exports = mongoose.model('User', UserSchema);