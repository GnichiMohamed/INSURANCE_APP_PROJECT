const mongoose = require("mongoose");

const VehicleSchema = new mongoose.Schema({
  // Every Vehicle should be associated with a user, So we need to create a reference to
  // the user model
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
  },
  new_value: {
    type: String,
    required: true,
  },
  actual_value: {
    type: String,
    required: true,
  },
  date_first_circulation: {
    type: Date,
    required: true,
  },
  brand: {
    type: String,
    required: true,
  },
  model: {
    type: String,
    required: true,
  },
  power: {
    type: String,
    required: true,
  },

  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = Vehicle = mongoose.model("vehicle", VehicleSchema);
