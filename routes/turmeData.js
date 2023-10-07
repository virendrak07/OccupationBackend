const express = require('express');
const router = express.Router();
const TurmeData = require('../models/turmeData');

// Create a new TurmeData document and save it to the database
router.post('/turmeData', async (req, res) => {
    try {
        const { patientId, time } = req.body;
        const turmeData = new TurmeData({ patientId, time,date: new Date() });
        await turmeData.save();
        res.status(201).json({ message: 'TurmeData saved successfully' });
    } catch (error) {
        console.error('Error saving TurmeData:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

module.exports = router;
