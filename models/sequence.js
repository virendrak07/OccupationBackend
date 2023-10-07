const mongoose = require('mongoose');

const sequenceSchema = new mongoose.Schema({
    collectionName: { type: String, required: true, unique: true },
    nextId: { type: Number, default: 1 },
});

const Sequence = mongoose.model('Sequence', sequenceSchema);

module.exports = Sequence;
