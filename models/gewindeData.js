// models/GewindeData.js
const mongoose = require('mongoose');

const gewindeDataSchema = new mongoose.Schema({
    patientId: {
        type: String,
        required: true,
    },
    time: {
        type: Number,
        required: true,
    },
    date: {
        type: Date,
        default: Date.now, 
    },
    // Add other fields as needed
});

const GewindeData = mongoose.model('GewindeData', gewindeDataSchema);

module.exports = GewindeData;
