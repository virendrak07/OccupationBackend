const express = require('express');
const router = express.Router();
const KlotzeData = require('../models/klotzeData');

// Create a new GewindeData document and save it to the database
router.post('/klotzeData', async (req, res) => {
    try {
        const { patientId, time } = req.body;
        const klotzeData = new KlotzeData({ patientId, time ,date: new Date() });
        await klotzeData.save();
        res.status(201).json({ message: 'KlotzeData saved successfully' });
    } catch (error) {
        console.error('Error saving KlotzeData:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});
/**
 * This function represents get KlotzeData Game data by patientId
 * @param {*} req
 * @param {*} res
 * @author Virendra Kadam
 */
router.get('/klotzeData-game/:patientId', async (req, res) => {
    try {
        const { patientId } = req.params;

        const gameData = await KlotzeData.find({ patientId });

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
