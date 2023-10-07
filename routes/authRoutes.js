const express = require('express');
const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
const { jwtkey } = require('../keys')
const router = express.Router();
const userData = mongoose.model('userData')

/**
 * This function represents User Signup
 * @param {*} req
 * @param {*} res
 * @author Virendra Kadam
 */
router.post('/signup', async (req, res) => {
    const { email, password, doctorId } = req.body;
    try {
        const existingUser = await userData.findOne({ email }); // Check if the email already exists in the database
        if (existingUser) {
            return res.status(422).send({ error: "Email already exists" }); // Return an error response if the email already exists
        }

        const user = new userData({ email, password, doctorId });
        await user.save();
        const token = jwt.sign({ userId: user._id }, jwtkey);
        res.send({ token: token });
    } catch (err) {
        return res.status(422).send({ error: err.message });
    }
});


/**
 * This function represents User Login
 * @param {*} req
 * @param {*} res
 */
router.post('/signin', async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(422).send({ error: "Must provide email or password" })
    }
    const user = await userData.findOne({ email })
    if (!user) {
        return res.status(422).send({ error: "Must provide email or password" })
    }
    try {
        await user.comparePassword(password);
        const token = jwt.sign({ userId: user._id }, jwtkey);
        res.send({ token: token, doctorId: user.doctorId });
    } catch (err) {
        return res.status(422).send({ error: "Must provide email or password" })
    }
})

module.exports = router;
