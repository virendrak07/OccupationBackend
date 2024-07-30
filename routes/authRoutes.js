const express = require("express");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const { jwtkey } = require("../keys");
const router = express.Router();
const userData = mongoose.model("userData");
const nodemailer = require("nodemailer");
/**
 * This function represents User Signup
 * @param {*} req
 * @param {*} res
 * @author Virendra Kadam
 */
router.post("/signup", async (req, res) => {
  const { email, password, doctorId, name, contactNumber } = req.body;
  try {
    const existingUser = await userData.findOne({ email }); // Check if the email already exists in the database
    if (existingUser) {
      return res.status(422).send({ error: "Email already exists" }); // Return an error response if the email already exists
    }

    const user = new userData({
      email,
      password,
      doctorId,
      name,
      contactNumber,
    }); // Include name and contactNumber
    await user.save();
    const token = jwt.sign({ userId: user._id }, jwtkey);
    res.send({ token: token });

    // Send welcome email to the new user
    const transporter = nodemailer.createTransport({
      service: "Gmail", // e.g., Gmail, Outlook, etc.
      auth: {
        user: "otherapy1969@gmail.com",
        pass: "hzdd omdx wgrm ovew",
      },
    });

    const mailOptions = {
      from: "otherapy1969@gmail.com",
      to: email,
      subject: "Welcome to Our Occupational Therapy",
      text: `Dear ${name},\n\nThank you for signing up for our Occupational Therapy. Your selected password is: ${password}\n\nPlease keep this password secure and do not share it with anyone.\n\nSincerely,\nThe Occupational Therapy Team`,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error("Error sending email:", error);
      } else {
        console.log("Email sent:", info.response);
      }
    });
  } catch (err) {
    return res.status(422).send({ error: err.message });
  }
});

/**
 * This function represents User Login
 * @param {*} req
 * @param {*} res
 */
router.post("/signin", async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(422).send({ error: "Must provide email or password" });
  }
  const user = await userData.findOne({ email });
  if (!user) {
    return res.status(422).send({ error: "Must provide email or password" });
  }
  try {
    await user.comparePassword(password);
    const token = jwt.sign({ userId: user._id }, jwtkey);
    res.send({ token: token, doctorId: user.doctorId });
  } catch (err) {
    return res.status(422).send({ error: "Must provide email or password" });
  }
});

/**
 * This function represents User Search by Doctor ID
 * @param {*} req
 * @param {*} res
 */
router.get("/search/:doctorId", async (req, res) => {
  const { doctorId } = req.params;
  try {
    const users = await userData.find({ doctorId });
    if (!users || users.length === 0) {
      return res
        .status(404)
        .send({ error: "No users found for the provided doctor ID" });
    }
    res.send(users);
  } catch (err) {
    return res.status(500).send({ error: "Internal server error" });
  }
});

module.exports = router;
