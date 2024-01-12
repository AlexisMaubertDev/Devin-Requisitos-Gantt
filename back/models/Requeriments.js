const mongoose = require("mongoose");
const { v4: uuidv4 } = require("uuid");

const requeriments = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  estimatedTime: {
    type: String,
    required: true,
  },
  predecessor: {
    type: String,
    required: true,
  },
  id: {
    type: String,
    default: uuidv4,
    unique: true,
  },
});

const Requeriment = mongoose.model("requeriments", requeriments);

module.exports = Requeriment;
