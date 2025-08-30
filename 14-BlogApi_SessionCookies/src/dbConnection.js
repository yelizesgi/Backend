"use strict";
/* -------------------------------------------------------
     EXPRESSJS - BLOG Project with Mongoose
------------------------------------------------------- */

const mongoose = require('mongoose');

const dbConnection = () => {
    mongoose.connect(process.env?.DB_URI || 'mongodb://127.0.0.1:27017/blogAPI') // default db name 'test'
        .then(() => console.log('* DB Connected *'))
        .catch((err) => console.log('! DB Not Connected !', err))
}

module.exports = dbConnection