
const mongoose = require('mongoose');

const klotzeDataSchema = new mongoose.Schema({
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

const KlotzeData = mongoose.model('KlotzeData', klotzeDataSchema);

module.exports = KlotzeData;
