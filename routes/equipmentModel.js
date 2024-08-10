const mongoose = require('mongoose');

const equipmentSchema = new mongoose.Schema({
    ownername: {
        type: String,
        required: true,
      },
    number: {
        type: Number,
        required: true,
      },
  equipmentName: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  photo: {
    type: String, // Store the file path or URL
    required: true,
  },
  location: {
    district: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    area: {
      type: String,
      required: true,
    },
  },
});

const Equipment = mongoose.model('Equipment', equipmentSchema);

module.exports = Equipment;
