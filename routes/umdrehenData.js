const express = require('express');
const router = express.Router();
const UmdrehenData = require('../models/umdrehenData');

// Create a new umdrehenData document and save it to the database
router.post('/umdrehenData', async (req, res) => {
    try {
        const { patientId, time } = req.body;
        const umdrehenData = new UmdrehenData({ patientId, time,date: new Date() });
        await umdrehenData.save();
        res.status(201).json({ message: 'UmdrehenData saved successfully' });
    } catch (error) {
        console.error('Error saving UmdrehenData:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});
/**
 * This function represents get umdrehenData Game data by patientId
 * @param {*} req
 * @param {*} res
 * @author Virendra Kadam
 */
router.get('/umdrehenData-game/:patientId', async (req, res) => {
    try {
        const { patientId } = req.params;

        const gameData = await UmdrehenData.find({ patientId });

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
        console.error('Error fetching Umdrehen Game data:', error);
        res.status(500).json({ message: 'An error occurred while fetching the Umdrehen Game data.' });
    }
});
module.exports = router;
