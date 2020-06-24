const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const tripSchema = new Schema({
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  phoneNumber: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: false
  },
  opinion: {
    type: String,
    required: true
  },
  destination: {
    type: String,
    required: true
  },
  frontImage: {
    type: String,
    required: true
  },
  backImage: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model("User", tripSchema);
