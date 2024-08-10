const mongoose = require('mongoose');

const userProfileSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User' },
    profileImage: { type: String }, // URL or path to the image
    name: { type: String, required: true },
    address: { type: String },
    pincode: { type: String },
    city: { type: String },
});

const Profile = mongoose.model('Profile', userProfileSchema);

module.exports = Profile;
