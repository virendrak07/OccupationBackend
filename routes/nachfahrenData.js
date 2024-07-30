const express = require('express');
const router = express.Router();
const NachfahrenData = require('../models/nachfahrenData');

// Create a new GewindeData document and save it to the database
router.post('/nachfahrenData', async (req, res) => {
    try {
        const { patientId, time } = req.body;
        const nachfahrenData = new NachfahrenData({ patientId, time ,date: new Date() });
        await nachfahrenData.save();
        res.status(201).json({ message: 'nachfahrenData saved successfully' });
    } catch (error) {
        console.error('Error saving nachfahrenData:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});
/**
 * This function represents get nachfahrenData Game data by patientId
 * @param {*} req
 * @param {*} res
 * @author Virendra Kadam
 */
router.get('/nachfahrenData-game/:patientId', async (req, res) => {
    try {
        const { patientId } = req.params;

        const gameData = await NachfahrenData.find({ patientId });

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
        console.error('Error fetching Klotze Game data:', error);
        res.status(500).json({ message: 'An error occurred while fetching the Klotze Game data.' });
    }
});
module.exports = router;
