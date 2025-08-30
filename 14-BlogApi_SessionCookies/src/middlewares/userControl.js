"use strict";
/* -------------------------------------------------------
     EXPRESSJS - BLOG Project with Mongoose
------------------------------------------------------- */

// Authentication middleware
const User = require('../models/userModel');

module.exports = async (req, res, next) => {

    req.user = null;

    const { _id, email } = req?.session

    if (_id) {
        const user = await User.findOne({ _id, email });
        
        // if (user) {
        //     req.user = user;
        // } else {
        //     req.session = null;
        // }


        user ? req.user = user : req.session = null
    }

    next();
}