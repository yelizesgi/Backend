"use strict";
/* -------------------------------------------------------
     EXPRESSJS - BLOG Project with Mongoose
------------------------------------------------------- */

const User = require('../models/userModel');
const passwordEncrypte = require('../utils/passwordEncrypte');


module.exports = {

    list: async (req, res) => {

        const result = await User.find();

        res.status(200).send({
            error: false,
            result
        })
    },

    create: async (req, res) => {

        const { password } = req.body

        if (!password || password.length < 8) {
            res.errorStatusCode = 400;
            throw new Error('The password must be more than 8 character.')
        };

        const result = await User.create(req.body);

        res.status(200).send({
            error: false,
            result
        })
    },

    read: async (req, res) => {

        const result = await User.findById(req.params.id);

        res.status(200).send({
            error: false,
            result
        })
    },

    update: async (req, res) => {

        const result = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });

        if (!result) {
            res.errorStatusCode = 404
            throw new Error('Data is not found or something wrong.');
        };

        res.status(200).send({
            error: false,
            result
        });
    },

    delete: async (req, res) => {

        const result = await User.deleteOne({ _id: req.params.id });

        if (result?.deletedCount) {
            res.sendStatus(204)
        } else {
            res.errorStatusCode = 404
            throw new Error('Data is not found or something wrong.');
        }
    },

    login: async (req, res) => {

        // Ilk adim, kisinin gonderdigi bilgileri yakala
        const { email, password } = req.body;

        // email ve password kontrolu
        if (email && password) {

            // emaili dogrulama 
            // const user = await User.findOne({ email: email });
            const user = await User.findOne({ email });

            if (user) {

                // password dogrulma
                if (passwordEncrypte(password) === user.password) {

                    // session 
                    // req.session._id = user._id;
                    // req.session.email = user.email;
                    req.session = {
                        email: user.email,
                        _id: user._id
                    };

                    // Cookie
                    if (req.body?.rememberMe) {
                        req.session.rememberMe = true;
                        req.sessionOptions.maxAge = 1000 * 60 * 60 * 24 * 3
                    };

                    res.status(200).send({
                        error: false,
                        message: 'Login is success',
                        user
                    });

                } else {
                    res.errorStatusCode = 401;
                    throw new Error('Wrong email or password');
                }

            } else {
                res.errorStatusCode = 401;
                throw new Error('Wrong email or password');
            }

        } else {
            res.errorStatusCode = 401;
            throw new Error('Email and Password are required');
        }


    },

    logout: async (req, res) => {

        req.session = null; // session objesini temizler

        res.status(200).send({
            error: false,
            message: "Logut is success"
        })
    }

}