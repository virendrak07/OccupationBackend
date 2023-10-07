const express = require('express');
const router = express.Router();
const ZielenGame = require('../models/zielenGame');

/**
 * This function represents Create a Zielen Game
 * @param {*} req
 * @param {*} res
 * @author Virendra Kadam
 */
router.post('/zielen-game', async (req, res) => {
    try {
        const { patientId, score } = req.body;

        const zielenGame = new ZielenGame({
            patientId,
            score,
            date: new Date() // Add the current date and time
            // Include other relevant data properties
        });

        await zielenGame.save();

        res.status(201).json({ message: 'Zielen Game data stored successfully.' });
    } catch (error) {
        console.error('Error storing Zielen Game data:', error);
        res.status(500).json({ message: 'An error occurred while storing the Zielen Game data.' });
    }
});

/**
 * This function represents get Zielen Game data by patientId
 * @param {*} req
 * @param {*} res
 * @author Virendra Kadam
 */
router.get('/zielen-game/:patientId', async (req, res) => {
    try {
        const { patientId } = req.params;

        const gameData = await ZielenGame.find({ patientId });

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
