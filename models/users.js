
var mongoose = require('mongoose');

var userSchema = new mongoose.Schema({
  name: {
    first: {
      type: String,
      required: true
    },
    last: {
      type: String,
      required: true
    }
  },

  email: {
    type: String,
  },

  password: {
    type: String,
    required: true
  },

  createdAt: {
    type: Date,
    default: Date.now
  },

  image: {
    type: String
  },
  
  coverPhoto: {
    type: String
  },

  location: {
    city: {
      type: String
    },
    country: {
      type: String
    },
  },

  bookmarks: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'posts'
    }
  ],
})


module.exports = mongoose.model("users", userSchema, "users");