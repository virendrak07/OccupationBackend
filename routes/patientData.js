const express = require('express');
const router = express.Router();
const PatientData = require('../models/patientData');
const ZielenGame = require('../models/zielenGame');
const Sequence = require('../models/sequence');
const nodemailer = require('nodemailer');


/**
 * This function represent Create a new patient
 * @param {*} req 
 * @param {*} res 
 * @author Virendra Kadam
 */


router.post('/patientData', async (req, res) => {
    console.log(req.body);
    const { firstName, lastName, email, contactNumber, address, gender, description, doctorId } = req.body;
    try {
        const sequence = await Sequence.findOneAndUpdate(
            { collectionName: 'PatientData' },
            { $inc: { nextId: 1 } },
            { new: true, upsert: true }
        );
        const newPatient = new PatientData({ patientId: sequence.nextId, firstName, lastName, email, contactNumber, address, gender, description, doctorId });
        await newPatient.save();

        // Send email to the new patient
        const transporter = nodemailer.createTransport({
            service: 'Gmail', // e.g., Gmail, Outlook, etc.
            auth: {
                user: 'otherapy1969@gmail.com',
                pass: 'rvhikhtnvakyqyqw'
            }
        });

        const mailOptions = {
            from: 'otherapy1969@gmail.com',
            to: email,
            subject: 'Welcome to Our Occpation Therapy',
            text: `Dear ${firstName} ${lastName},\n\nThank you for joining our Occpation Therapy. We are pleased to have you as our patient.\n\nYour patient ID is: ${sequence.nextId}\n\nSincerely,\nThe Occpation Therapy Team`
        };

        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.error('Error sending email:', error);
            } else {
                console.log('Email sent:', info.response);
            }
        });

        res.json(newPatient);
    } catch (error) {
        res.status(500).json({ error: 'Failed to create user' });
    }
});

/**
 * This function represent Update patient data
 * @param {*} req 
 * @param {*} res 
 * @author Virendra Kadam
 */

router.put('/updatePatient/:patientId', async (req, res) => {
    const { patientId } = req.params;
    console.log(req.body)
    const { firstName, lastName, email, contactNumber, address, gender, description } = req.body;
    try {
        const patientData = await PatientData.findOneAndUpdate(
            { patientId: String(patientId) },
            { firstName, lastName, email, contactNumber, address, gender, description },
            { new: true }
        );

        if (!patientData) {
            return res.status(404).json({ message: 'Patient data not found' });
        }

        res.json(patientData);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
});

/**
 * This function represent Get all patient data
 * @param {*} req 
 * @param {*} res 
 * @author Virendra Kadam
 */

router.get('/getAllPatient', async (req, res) => {
    try {
        const doctorId = req.query.doctorId; // Get the doctorId from the query parameters

        // Find all patient data with the specified doctorId
        const patientData = await PatientData.find({ doctorId: doctorId });

        res.json(patientData);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
});

/**
 * This function represent Delete a patient and their associated game data
 * @param {*} req 
 * @param {*} res 
 * @author Virendra Kadam
 */

router.delete('/:patientId', async (req, res) => {
    const { patientId } = req.params;

    try {
        // Delete the patient and their associated game data
        const patientData = await PatientData.findOneAndDelete({ patientId });
        await ZielenGame.deleteMany({ patientId });

        if (!patientData) {
            return res.status(404).json({ message: 'Patient data not found' });
        }

        res.json({ message: 'Patient and game data deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
});

/**
 * This function represents Get patient data by patientId
 * @param {*} req
 * @param {*} res
 * @author Virendra Kadam
 */
router.get('/:patientId', async (req, res) => {
    const { patientId } = req.params;

    try {
        const patientData = await PatientData.findOne({ patientId });

        if (!patientData) {
            return res.status(404).json({ message: 'Patient data not found' });
        }

        res.json(patientData);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
});
module.exports = router;
