
const mongoose = require('mongoose');

const nachfahrenDataSchema = new mongoose.Schema({
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

const NachfahrenData = mongoose.model('nachfahrenData', nachfahrenDataSchema);

module.exports = NachfahrenData;
