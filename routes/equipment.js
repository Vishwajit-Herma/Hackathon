const mongoose = require('mongoose');

const equipmentSchema = new mongoose.Schema({
    equipmentType: String,
    pricePerDay: Number,
    availableFrom: Date,
    available: Boolean,
    ownerName: String,
    phoneNumber: Number,
    address: String

});

module.exports = mongoose.model('Equipments', equipmentSchema);
