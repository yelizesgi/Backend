"use strict"
/* -------------------------------------------------------
EXPRESS - Personnel API
------------------------------------------------------- */

const Personnel = require('../models/personnel.model');
const Token = require('../models/token.model');
const passwordEncrypt = require('../helpers/passwordEncrypt');

module.exports = {

    list: async (req, res) => {

        const result = await res.getModelList(Personnel)

        res.status(200).send({
            error: false,
            details: await res.getModelListDetails(Personnel),
            result
        });
    },

    create: async (req, res) => { // Register

        const user = await Personnel.create(req.body)

        // Token //
        const token = await Token.create({
            userId: user._id,
            token: passwordEncrypt(user._id + Date.now())
        });

        res.status(201).send({
            error: false,
            token:token.token,
            user
        });
    },

    read: async (req, res) => {

        const result = await Personnel.findOne({ _id: req.params.id });

        res.status(200).send({
            error: false,
            result
        });
    },

    update: async (req, res) => {

        const result = await Personnel.findByIdAndUpdate(req.params.id, req.body, {
            runValidators: true, // run validation method 
            new: true // returns updated data
        });

        res.status(202).send({
            error: false,
            result
        });
    },

    dlt: async (req, res) => {

        const result = await Personnel.deleteOne({ _id: req.params.id });

        res.status(result.deletedCount ? 204 : 404).send({
            error: true,
            message: "Data is not found or already deleted."
        });
    },

};