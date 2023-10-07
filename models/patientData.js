const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const patientSchema = new mongoose.Schema({
    patientId: { type: Number, required: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, unique: true },
    contactNumber: { type: String, required: true },
    address: { type: String, required: true },
    gender: { type: String, required: true },
    description: { type: String, required: true },
    doctorId: { type: String, required: true },
});

patientSchema.pre('save', function (next) {
    const doc = this;
    if (!doc.patientId) {
        doc.patientId = generatePatientId();
    }
    next();
});

function generatePatientId() {
    const timestamp = Date.now().toString(36).toUpperCase();
    const randomString = Math.random().toString(36).substr(2, 5).toUpperCase();
    return `P${timestamp}${randomString}`;
}
const PatientData = mongoose.model('patientData', patientSchema);

module.exports = PatientData;