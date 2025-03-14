const mongoose = require('mongoose');

mongoose.connect("mongodb+srv://Sourabh:sourabh112002@noteapp.4h5mp.mongodb.net/noteApp?retryWrites=true&w=majority&appName=NoteApp");

const userSchema = new mongoose.Schema({
  username: String,
  name: String,
  email: String,
  password: String,
  profilePic: String,
  date: {
    type: Date,
    default: Date.now
  }
});

mongoose.model('User', userSchema);

module.exports = mongoose.model('User');