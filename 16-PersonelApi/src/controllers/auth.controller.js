"use strict"
/* -------------------------------------------------------
    EXPRESS - Personnel API
------------------------------------------------------- */

const Personnel = require('../models/personnel.model');
const CustomError = require('../helpers/customError');


module.exports = {

    login: async (req, res) => {

        const { userName, email, password } = req.body;

        if (!((userName || email) && password)) throw new CustomError('UserName or email and password are required.', 400)

        // findOne set methodunu calistirir
        const user = await Personnel.findOne({ $or: [{ userName }, { email }], password });

        if (!user) throw new CustomError('Wrong email/userName or password', 401);

        // if(user.isActive === false)
        if (!user.isActive) throw new CustomError('The user status is not active', 401);

        // Session
        req.session = { id: user.id, email: user.email };

        // Cookie
        if (req.body.rememberMe) req.sessionOptions.maxAge = 1000 * 60 * 60 * 24 * 3 // 3 days

        res.status(200).send({
            error: false,
            user
        });
    }, 

    logout: async (req, res) => {
        
        req.session = null;

        res.status(200).send({
            error: false,
            message:"Logout is success"
        })
    }

}