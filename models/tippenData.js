const mongoose = require('mongoose');

const TippenGameSchema = new mongoose.Schema({
    patientId: {
        type: String,
        required: true,
    },
    score: {
        type: Number,
        required: true,
    },
    date: {
        type: Date,
        default: Date.now, 
    },
    
});

const TippenGame = mongoose.model('TippenGame', TippenGameSchema);

module.exports = TippenGame;
