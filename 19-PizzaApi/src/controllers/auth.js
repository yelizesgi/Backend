"use strict"
/* -------------------------------------------------------
    | FULLSTACK TEAM | NODEJS / EXPRESS |
------------------------------------------------------- */
const CustomError = require('../helpers/customError');
const User = require('../models/user');
const Token = require('../models/token');
const passwordEncrypt = require('../helpers/passwordEncrypt');


module.exports = {
    login: async (req, res) => {
        /*
            #swagger.tags = ["Authentication"]
            #swagger.summary = "Login"
            #swagger.description = 'Login with username (or email) and password for get simpleToken and JWT'
            #swagger.parameters["body"] = {
                in: "body",
                required: true,
                schema: {
                    "username": "test",
                    "password": "aA12345.?",
                }
            }
        */

        const { username, email, password } = req.body;

        if (!((username || email) && password)) throw new CustomError('Username/Email and Password are required.', 401);

        const user = await User.findOne({ $or: [{ username }, { email }], password });

        if (!user) throw new CustomError('Incorrect Username/Email or Password.', 401);

        if (!user.isActive) throw new CustomError('This account is not active.', 401);


        let tokenData = await Token.findOne({ userId: user._id });

        if (!tokenData) {
            tokenData = await Token.create({
                userId: user._id,
                token: passwordEncrypt(Date.now() + user._id)
            });
        }

        res.status(200).send({
            error: false,
            token: tokenData.token,
            user
        });
    },

    logout: async (req, res) => {
        /*
           #swagger.tags = ["Tokens"]
           #swagger.summary = "Create Token"
        */

        const currentUserId = req.user._id;

        let result = currentUserId ? await Token.deleteOne({ userId: currentUserId }) : null;

        res.status(200).send({
            error: false,
            message: result.deletedCount ? 'User logout success and token deleted.' : 'User logout success.'
        });
    }
}