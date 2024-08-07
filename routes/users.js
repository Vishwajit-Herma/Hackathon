const mongoose = require('mongoose');
mongoose.connect("mongodb://127.0.0.1:27017/hackathon");

const userSchema = new mongoose.Schema({
  name:{
    type: String
  }
});

module.exports = mongoose.model('User', userSchema);
