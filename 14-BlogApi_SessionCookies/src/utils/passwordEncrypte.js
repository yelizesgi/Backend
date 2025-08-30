"use strict";
/* -------------------------------------------------------
     EXPRESSJS - BLOG Project with Mongoose
------------------------------------------------------- */

const crypto = require('node:crypto');

// Password Encryption
// https://nodejs.org/docs/latest/api/crypto.html#cryptopbkdf2syncpassword-salt-iterations-keylen-digest


module.exports = (password) => {

    const salt = process.env.PASS_SALT;
    const iterations = parseInt(process.env?.PASS_ITERATIONS);
    const keylen = parseInt(process.env?.PASS_KEYLEN); // write 32 for 64
    const digest = process.env.PASS_DIGEST;

    return crypto.pbkdf2Sync(password, salt, iterations, keylen, digest).toString('hex');
}