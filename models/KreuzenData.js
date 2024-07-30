
const mongoose = require('mongoose');

const kreuzenDataSchema = new mongoose.Schema({
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

const KreuzenData = mongoose.model('kreuzenData', kreuzenDataSchema);

module.exports = KreuzenData;
