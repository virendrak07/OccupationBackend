const mongoose = require('mongoose');
const zielenScoreSchema = new mongoose.Schema({
    patientId: { type: String, required: true },
    timeTaken: { type: Number, required: true },
    lastScore: { type: Number, required: true },
    date: { type: Date, default: Date.now },
});

const ZielenTrainingScore = mongoose.model('ZielenTrainingScore', zielenScoreSchema);
module.exports = ZielenTrainingScore;