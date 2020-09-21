const mongoose = require("mongoose");

const OfferSchema = new mongoose.Schema({
  // Every offer should be associated with a user, So we need to create a reference to
  // the user model
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
  },
  title: {
    type: String,
    required: true,
  },
  company: {
    type: String,
    required: true,
  },
  location: {
    type: String,
  },
  from: {
    type: Date,
    required: true,
  },
  to: {
    type: Date,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
  },
  // Blockchain
  blockchain_id: {
    type: Number
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = Offer = mongoose.model("offer", OfferSchema);
