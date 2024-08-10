const express = require('express');
const mongoose = require('mongoose');
const multer = require('multer');
const path = require('path');
const Equipment = require('./equipmentModel'); // Import the Equipment model

const router = express.Router();

// Set up Multer for file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/'); // Directory where photos will be stored
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname)); // File name with timestamp
  },
});

const upload = multer({ storage: storage });

// GET route for displaying the form
router.get('/sell', (req, res) => {
  res.render('sell'); // Render the EJS form
});

// POST route for handling form submission
router.post('/sell', upload.single('photo'), async (req, res) => {
  try {
    const newEquipment = new Equipment({
        ownername:req.body.ownername,
        number:req.body.number,
      equipmentName: req.body.equipmentName,
      name: req.body.name,
      description: req.body.description,
      price: req.body.price,
      photo: req.file.path, // Store the file path of the uploaded photo
      location: {
        district: req.body.district,
        city: req.body.city,
        area: req.body.area,
      },
    });

    await newEquipment.save();
    res.redirect('/'); // Redirect to a success page or any other page
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
