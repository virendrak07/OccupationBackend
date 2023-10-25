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
/**
 * This function represents get turmeData Game data by patientId
 * @param {*} req
 * @param {*} res
 * @author Virendra Kadam
 */
router.get('/turmeData-game/:patientId', async (req, res) => {
    try {
        const { patientId } = req.params;

        const gameData = await TurmeData.find({ patientId });

        const formattedGameData = gameData.map((game) => {
            const dateObj = new Date(game.date);
            const formattedDate = dateObj.toLocaleDateString();
            const formattedTime = dateObj.toLocaleTimeString();

            return {
                ...game._doc,
                formattedDate,
                formattedTime,
            };
        });

        res.status(200).json(formattedGameData);
    } catch (error) {
        console.error('Error fetching Turme Game data:', error);
        res.status(500).json({ message: 'An error occurred while fetching the Turme Game data.' });
    }
});
module.exports = router;
