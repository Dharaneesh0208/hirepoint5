const mongoose = require("mongoose");

const expertSchema = new mongoose.Schema({
  name: String,
  skill: String,
  location: String,
  email: String,
  phone: String
});

module.exports = mongoose.model("Expert", expertSchema);