const mongoose = require('mongoose');
const bcrypt = require('bcrypt')
const Schema = mongoose.Schema;
const userSchema = new Schema({
    doctorId: {
        type: String,
        unique: true,
        required: true,
        default: function () {
            const timestamp = Date.now().toString();
            const randomNum = Math.floor(Math.random() * 1000).toString().padStart(3, '0');
            return `DOC${timestamp}-${randomNum}`;
        }
    },
    email: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    contactNumber: {
        type: String,
        required: true
    }
})

/**
 * This function represent User Login  
 * @param {*} req 
 * @param {*} res 
 * @author Virendra Kadam
 */
userSchema.pre('save', function (next) {
    const user = this;
    if (!user.isModified('password')) {
        return next();
    }
    bcrypt.genSalt(11, (err, salt) => {
        if (err) {
            return next(err)
        }
        bcrypt.hash(user.password, salt, (err, hash) => {
            if (err) {
                return next(err)
            }
            user.password = hash;
            next()
        })

    })
})

/**
 * This function represent User Login  
 * @param {*} req 
 * @param {*} res 
 * @author Virendra Kadam
 */
userSchema.methods.comparePassword = function (candidatePassword) {
    const user = this;
    return new Promise((resolve, reject) => {
        bcrypt.compare(candidatePassword, user.password, (err, isMatch) => {
            if (err) {
                return reject(err)
            }
            if (!isMatch) {
                return reject(err)
            }
            resolve(true)
        })
    })
}
mongoose.model('userData', userSchema);
