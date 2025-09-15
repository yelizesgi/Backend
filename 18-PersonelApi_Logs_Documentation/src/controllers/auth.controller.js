"use strict"
/* -------------------------------------------------------
    EXPRESS - Personnel API
------------------------------------------------------- */

const Personnel = require('../models/personnel.model');
const CustomError = require('../helpers/customError');
const Token = require('../models/token.model');
const passwordEncrypt = require('../helpers/passwordEncrypt');


module.exports = {

    login: async (req, res) => {

        /* 
            #swagger.tags = ['Authentication']
            #swagger.summary = 'Login'
            #swagger.description = 'Login with username/email and password'
            #swagger.parameters['body']= {
                in:'body',
                required: true,
                schema: {
                    userName:'admin',
                    password:'1234'
                }
            }
        */

        const { userName, email, password } = req.body;

        if (!((userName || email) && password)) throw new CustomError('UserName or email and password are required.', 400)

        // findOne set methodunu calistirir
        const user = await Personnel.findOne({ $or: [{ userName }, { email }], password });

        if (!user) throw new CustomError('Wrong email/userName or password', 401);

        // if(user.isActive === false)
        if (!user.isActive) throw new CustomError('The user status is not active', 401);

        // Token

        // Token var mi yok mu ?
        let token = await Token.findOne({ userId: user._id })

        // Token yoksa olustur
        if (!token) {
            token = await Token.create({
                userId: user._id,
                token: passwordEncrypt(user._id + Date.now())
            });
        }

        res.status(200).send({
            error: false,
            token: token.token,
            user
        });
    },

    logout: async (req, res) => {
        /*
            #swagger.tags = ['Authentication']
            #swagger.summary = 'Logout'
            #swagger.description = 'Delete token.'
        */

        // const data = await Token.deleteOne({})

        res.status(200).send({
            error: false,
            message: "Logout is success"
        })
    }

}