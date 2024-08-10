require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const authRoutes = require('./routes/index');
const profileRoutes = require('./routes/profile');
const sellRoute = require('./routes/sell'); 
const path = require('path');
const buyRoute = require('./routes/buy');
const rentRoute = require('./routes/rent')
const app = express();

// Connect to MongoDB
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


// Middleware
app.use('/profile', profileRoutes);
app.use(express.static(path.join(__dirname, 'public')));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use(bodyParser.urlencoded({ extended: false }));
app.set('view engine', 'ejs');


// Routes
app.use('/', authRoutes);
app.use('/', sellRoute);
app.use('/', buyRoute);
app.use('/', rentRoute);
// Assuming the profile routes are in routes/profile.js




module.exports = app;
