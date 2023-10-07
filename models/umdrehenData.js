const mongoose = require('mongoose');

const umdrehenDataSchema = new mongoose.Schema({
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

const UmdrehenData = mongoose.model('UmdrehenData', umdrehenDataSchema);

module.exports = UmdrehenData;
