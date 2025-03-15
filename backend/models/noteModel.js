const mongoose = require('mongoose');
mongoose.connect("mongodb+srv://Sourabh:sourabh112002@noteapp.4h5mp.mongodb.net/noteApp?retryWrites=true&w=majority&appName=NoteApp");
const notesSchema = new mongoose.Schema({
  title: String,
  description: String,
  content: String,
  isImportant: Boolean,
  uploadedBy: String,
  date:{
    type: Date,
    default: Date.now
  }
});
mongoose.model("Notes", notesSchema);
module.exports = mongoose.model("Notes")
