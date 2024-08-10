const express = require('express');
const router = express.Router();
const crypto = require('crypto');
const nodemailer = require('nodemailer');
const User = require('./users');
const multer = require('multer');
const UserProfile = require('./profileModel');

// Configure multer for file upload (profile image)

// Render the index page
router.get('/', (req, res) => {
    res.render('navbar');
});

// Handle phone number submission
router.post('/send-otp', async (req, res) => {
    const { phone } = req.body;
    const otp = crypto.randomInt(100000, 999999).toString();

    const otpExpires = Date.now() + 10 * 60 * 1000; // OTP valid for 10 minutes

    let user = await User.findOne({ phone });
    if (!user) {
        user = new User({ phone, otp, otpExpires });
    } else {
        user.otp = otp;
        user.otpExpires = otpExpires;
    }
    await user.save();

    // Send OTP to phone number (here, we're simulating it with an email)
    const transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
            user: process.env.EMAIL,
            pass: process.env.PASSWORD,
        },
    });

    const mailOptions = {
        from: process.env.EMAIL,
        to: process.env.RECIPIENT_EMAIL, // Simulate OTP sending
        subject: 'Your OTP Code',
        text: `Your OTP code is ${otp}`,
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.error(error);
        }
        console.log('OTP sent: ' + info.response);
    });

    res.render('otp', { phone });
});

// Verify OTP
router.post('/verify-otp', async (req, res) => {
    const { phone, otp } = req.body;
    const user = await User.findOne({ phone });

    if (!user) {
        return res.status(400).send('User not found');
    }

    if (user.otp === otp ) {
        return res.render('navbar');
    } else {
        return res.status(400).send('Invalid or expired OTP');
    }
});

module.exports = router;
