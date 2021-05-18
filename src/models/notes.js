const mongoose = require("mongoose");
const validator = require("validator");

const noteSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    minlength: 3,
  },
  details: {
    type: String,
    required: true,
    minlength: 3,
  },
  category: {
    type: String,
    required: true,
  },
  uid: {
    type: String,
    required: true
  }
});

const Note = new mongoose.model("Note", noteSchema);

module.exports = Note;
