const express = require('express');
const router = express.Router();
const ZielenTrainingScore = require('../models/zielenTraining');

/**
 * This function represents post Zielen Game data 
 * @param {*} req
 * @param {*} res
 * @author Virendra Kadam
 */
router.post('/scores', async (req, res) => {
    try {
        const { patientId, timeTaken, lastScore } = req.body;

        const zielenTrainingScore = new ZielenTrainingScore({
            patientId,
            timeTaken,
            lastScore,
            date: new Date()
            // Include other relevant data properties
        });

        await zielenTrainingScore.save();

        res.status(201).json({ message: 'Score data stored successfully.' });
    } catch (error) {
        console.error('Error storing score data:', error);
        res.status(500).json({ message: 'An error occurred while storing the score data.' });
    }
});

/**
 * This function represents get Zielen Game data by patientId
 * @param {*} req
 * @param {*} res
 * @author Virendra Kadam
 */
router.get('/zielenTraining-game/:patientId', async (req, res) => {
    try {
        const { patientId } = req.params;

        const gameData = await ZielenTrainingScore.find({ patientId });

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