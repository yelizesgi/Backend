"use strict";
/* -------------------------------------------------------
     EXPRESSJS - BLOG Project with Mongoose
------------------------------------------------------- */

const mongoose = require('mongoose');
const passwordEncrypte = require('../utils/passwordEncrypte');

/* ------------------------------------------------------- *
const crypto = require('node:crypto');

// Password Encryption
// https://nodejs.org/docs/latest/api/crypto.html#cryptopbkdf2syncpassword-salt-iterations-keylen-digest


const passwordEncrypte = function (password) {

    const salt = 'fsdfhkjh23hrjkdsfkjashf2rghjdbajkcnalur';
    const iterations = 10_000;
    const keylen = 32; // write 32 for 64
    const digest = 'sha512';

    return crypto.pbkdf2Sync(password, salt, iterations, keylen, digest).toString('hex');
}

/* ------------------------------------------------------- */
const userSchema = new mongoose.Schema({

    email: {
        type: String,
        trim: true,
        // unique: true,
        unique: [true, 'This email adress is in use.'],
        //* How validate works?
        // validate: () => { return false }, // if Validate return false it throws validation error.

        //* Trow Validation error
        // validate: (email) => {
        //     // console.log(email.includes('@') && email.includes('.'));

        //     if (email.includes('@') && email.includes('.')) {
        //         return true
        //     } else {
        //         return false
        //     }
        // },

        //* Trow validion error with custom message 
        // validate: [(email) => {
        //     return (email.includes('@') && email.includes('.'))
        // }, 'Please enter a valid email address.'],

        match: [/.+@.+\..+/, 'Please enter a valid email address.'],

        required: true
    },

    password: {
        type: String,
        trim: true,
        required: true,
        //* How set method works?
        // set: () => { return 'clarusway' } // whatever value set method returns, it will ve saved to DB.
        //* Using crypto module in set method
        // set: (pass) => {
        //     // console.log(passwordEncrypte(pass));
        //     return passwordEncrypte(pass)
        // },
        set: passwordEncrypte
    },

    userName: {
        type: String,
        trim: true,
        unique: true,
        required: true
    },

    firstName: String,

    lastName: String

}, {
    collection: 'users',
    timestamps: true
});

module.exports = mongoose.model('User', userSchema);