const express = require('express');
const multer = require('multer');
const path = require('path');
const Profile = require('./profileModel'); // Adjust the path as necessary
const router = express.Router();
const User = require('./users')

// Configure multer for file uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    },
});
const upload = multer({ storage: storage });

// Route to create or update profile
router.post('/create', upload.single('profileImage'), async (req, res) => {
    try {
        const { userId, name, address, pincode, city } = req.body;
        const profileImage = req.file ? req.file.path : undefined;

        const profile = await Profile.create(
            { userId: userId },
            { profileImage, name, address, pincode, city },
            // { new: true, upsert: true } // Create if not exists
        );
        await Profile.findByIdAndUpdate(Profile._id,{$push:{userId:User._id}},{new:true})
        await Profile.findById(Profile._id)
  .populate("userId")
  

        res.status(200).json(profile);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Route to get profile details
// router.get('/:userId', async (req, res) => {
//     try {
//         const profile = await Profile.findOne({ userId: req.params.userId });

//         if (!profile) return res.status(404).json({ message: 'Profile not found' });

//         res.status(200).json(profile);
//     } catch (err) {
//         res.status(500).json({ error: err.message });
//     }
// });

router.get('/create', (req, res) => {
    res.render('profile'); // Make sure 'profile.ejs' is in the 'views' directory
});
module.exports = router;