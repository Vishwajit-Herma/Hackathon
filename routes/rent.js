const express = require('express');
const router = express.Router();
const Equipment = require('./equipment'); // Assuming you have an Equipment model

// Render the rent page
router.get('/rent', (req, res) => {
    res.render('rent');
});

// Handle form submission for taking equipment on rent
router.post('/rent/take', async (req, res) => {
    try {
        const { equipmentType, duration } = req.body;
        // Fetch available equipment from the database
        const availableEquipment = await Equipment.find({ equipmentType, available: true });

        if (availableEquipment.length > 0) {
            res.render('availableEquipment', { equipment: availableEquipment, duration });
        } else {
            res.render('rent', { successMessage: `No ${equipmentType} available for rent.` });
        }
    } catch (error) {
        console.error('Error taking equipment on rent:', error);
        res.status(500).send('Internal Server Error');
    }
});

// Handle form submission for giving equipment on rent
router.post('/rent/give', async (req, res) => {
    try {
        const { equipmentType, pricePerDay, availableFrom,ownerName, address, phoneNumber } = req.body;
        // Logic to handle giving equipment on rent
        // For example, you can add the equipment to your database
        const newEquipment = new Equipment({
            equipmentType,
            pricePerDay,
            availableFrom, 
            ownerName, 
            address,
             phoneNumber,
             available: true,
        });
        await newEquipment.save();
        
        // Redirect to a confirmation page or back to the rent page
        res.send("Success");
    } catch (error) {
        console.error('Error giving equipment on rent:', error);
        res.status(500).send('Internal Server Error');
    }
});

module.exports = router;
