const express = require('express');
const router = express.Router();
const Product = require('./equipmentModel'); // Assuming you have a Product model

// Route to render the Buy page
router.get('/buy', async (req, res) => {
    try {
        const equipments = await Product.distinct('equipmentName'); // Fetch distinct equipment names
        res.render('buy', { equipments });
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
});

// Route to fetch details of selected equipment
router.get('/buy/:equipmentName', async (req, res) => {
    try {
        const products = await Product.find({ equipmentName: req.params.equipmentName });
        res.json(products);
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
});

module.exports = router;
