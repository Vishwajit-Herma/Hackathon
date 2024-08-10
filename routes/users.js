const mongoose = require('mongoose');
const plm = require("passport-local-mongoose");

mongoose.connect("mongodb://127.0.0.1:27017/hackathon");

const userSchema = new mongoose.Schema({
  phone: { type: String, required: true, unique: true },
    otp: { type: String, required: true },
    otpExpires: { type: Date, required: true }
});

userSchema.plugin(plm);

module.exports = mongoose.model('User', userSchema);
