const mongoose = require("mongoose");

const ProfileSchema = new mongoose.Schema({
  // Every profile should be associated with a user, So we need to create a reference to
  // the user model
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
  },
  company: {
    type: String,
    required: true,
  },
  website: {
    type: String,
  },
  sector: {
    type: String, // Private or Public
  },
  location: {
    type: String,
  },
  phone: {
    type: String,
  },
  about: {
    type: String,
    required: true,
  },

  social: {
    youtube: {
      type: String,
    },
    twitter: {
      type: String,
    },
    facebook: {
      type: String,
    },
    linkedin: {
      type: String,
    },
    youtube: {
      type: String,
    },
    instagram: {
      type: String,
    },
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = Profile = mongoose.model("profile", ProfileSchema);
