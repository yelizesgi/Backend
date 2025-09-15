"use strict"
/* -------------------------------------------------------
EXPRESS - Personnel API
------------------------------------------------------- */

const Personnel = require('../models/personnel.model');
const Token = require('../models/token.model');
const passwordEncrypt = require('../helpers/passwordEncrypt');

module.exports = {

    list: async (req, res) => {
        /*
            #swagger.tags = ["Personnels"]
            #swagger.summary = "List Personnels"
            #swagger.description = `
                You can send query with endpoint for search[], sort[], page and limit.
                <ul> Examples:
                    <li>URL/?<b>filter[field1]=value1&filter[field2]=value2</b></li>
                    <li>URL/?<b>search[field1]=value1&search[field2]=value2</b></li>
                    <li>URL/?<b>sort[field1]=1&sort[field2]=-1</b></li>
                    <li>URL/?<b>page=2&limit=1</b></li>
                </ul>
            `
        */

        const result = await res.getModelList(Personnel)

        res.status(200).send({
            error: false,
            details: await res.getModelListDetails(Personnel),
            result
        });
    },

    create: async (req, res) => { // Register

        /*
            #swagger.tags = ["Personnels"]
            #swagger.summary = "Create Personnel"
            #swagger.parameters['body'] = {
                in: 'body',
                required: true,
                schema: {
                    $ref: '#/definitions/Personnel'
                }
            }
        */

        const user = await Personnel.create(req.body)

        // Token //
        const token = await Token.create({
            userId: user._id,
            token: passwordEncrypt(user._id + Date.now())
        });

        res.status(201).send({
            error: false,
            token: token.token,
            user
        });
    },

    read: async (req, res) => {

        /*
            #swagger.tags = ["Personnels"]
            #swagger.summary = "Get Single Personnel"
        */

        const result = await Personnel.findOne({ _id: req.params.id });

        res.status(200).send({
            error: false,
            result
        });
    },

    update: async (req, res) => {
        /*
            #swagger.tags = ["Personnels"]
            #swagger.summary = "Update Personnel"
            #swagger.parameters['body'] = {
                in: 'body',
                required: true,
                schema: {
                    $ref: '#/definitions/Personnel'
                }
            }
        */

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
        /*
            #swagger.tags = ["Personnels"]
            #swagger.summary = "Delete Personnel"
        */

        const result = await Personnel.deleteOne({ _id: req.params.id });

        res.status(result.deletedCount ? 204 : 404).send({
            error: true,
            message: "Data is not found or already deleted."
        });
    },

};