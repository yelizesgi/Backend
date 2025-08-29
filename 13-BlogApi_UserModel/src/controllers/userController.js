"use strict";
/* -------------------------------------------------------
     EXPRESSJS - BLOG Project with Mongoose
------------------------------------------------------- */

const User = require('../models/userModel');


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
}