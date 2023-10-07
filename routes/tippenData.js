const express = require('express');
const router = express.Router();
const TippenGame = require('../models/tippenData');

/**
 * This function represents Create a Tippen Game
 * @param {*} req
 * @param {*} res
 * @author Virendra Kadam
 */
router.post('/Tippen-game', async (req, res) => {
    try {
        const { patientId, score } = req.body;

        const tippenGame = new TippenGame({
            patientId,
            score,
            date: new Date() // Add the current date and time
            // Include other relevant data properties
        });

        await tippenGame.save();

        res.status(201).json({ message: 'Tippen Game data stored successfully.' });
    } catch (error) {
        console.error('Error storing Tippen Game data:', error);
        res.status(500).json({ message: 'An error occurred while storing the tippen Game data.' });
    }
});
/**
 * This function represents get Tippen Game data by patientId
 * @param {*} req
 * @param {*} res
 * @author Virendra Kadam
 */
router.get('/Tippen-game/:patientId', async (req, res) => {
    try {
        const { patientId } = req.params;

        const gameData = await TippenGame.find({ patientId });

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
        console.error('Error fetching Zielen Game data:', error);
        res.status(500).json({ message: 'An error occurred while fetching the Zielen Game data.' });
    }
});
module.exports = router;
