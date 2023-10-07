const express = require('express');
const router = express.Router();
const NachfahrenData = require('../models/nachfahrenData');

// Create a new GewindeData document and save it to the database
router.post('/nachfahrenData', async (req, res) => {
    try {
        const { patientId, time } = req.body;
        const nachfahrenData = new NachfahrenData({ patientId, time,date: new Date() });
        await nachfahrenData.save();
        res.status(201).json({ message: 'NachfahrenData saved successfully' });
    } catch (error) {
        console.error('Error saving NachfahrenData:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

module.exports = router;
