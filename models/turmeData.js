const mongoose = require('mongoose');

const turmeDataSchema = new mongoose.Schema({
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
});

const TurmeData = mongoose.model('TurmeData', turmeDataSchema);

module.exports = TurmeData;
