const mongoose = require('mongoose');

const ZielenGameSchema = new mongoose.Schema({
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

const ZielenGame = mongoose.model('ZielenGame', ZielenGameSchema);

module.exports = ZielenGame;
