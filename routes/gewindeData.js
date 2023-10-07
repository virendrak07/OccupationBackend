const express = require('express');
const router = express.Router();
const GewindeData = require('../models/gewindeData');

// Create a new GewindeData document and save it to the database
router.post('/gewindeData', async (req, res) => {
    try {
        const { patientId, time } = req.body;
        const gewindeData = new GewindeData({ patientId, time, date: new Date() });
        await gewindeData.save();
        res.status(201).json({ message: 'GewindeData saved successfully' });
    } catch (error) {
        console.error('Error saving GewindeData:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});
/**
 * This function represents get GewindeData Game data by patientId
 * @param {*} req
 * @param {*} res
 * @author Virendra Kadam
 */
router.get('/gewindeData-game/:patientId', async (req, res) => {
    try {
        const { patientId } = req.params;

        const gameData = await GewindeData.find({ patientId });

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
        console.error('Error fetching Gewinde Game data:', error);
        res.status(500).json({ message: 'An error occurred while fetching the Gewinde Game data.' });
    }
});
module.exports = router;
