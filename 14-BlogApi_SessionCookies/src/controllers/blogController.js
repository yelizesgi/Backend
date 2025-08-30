"use strict";
/* -------------------------------------------------------
     EXPRESSJS - BLOG Project with Mongoose
------------------------------------------------------- */

const { BlogCategory, BlogPost } = require('../models/blogModel');

module.exports.blogCategory = {

    list: async (req, res) => {

        const result = await BlogCategory.find();

        res.status(200).send({
            error: false,
            result
        });
    },

    // CRUD Operations

    create: async (req, res) => {

        const result = await BlogCategory.create(req.body);

        res.status(201).send({
            error: false,
            result
        })
    },

    read: async (req, res) => {

        // const result = await BlogCategory.findOne({...filter}) 
        // const result = await BlogCategory.findOne({ _id: req.params.id });
        const result = await BlogCategory.findById(req.params.id);

        res.status(200).send({
            error: false,
            result
        })
    },

    update: async (req, res) => {

        // const result = await BlogCategory.updateOne({...filter}, {...data}, {...?options})
        // const result = await BlogCategory.updateOne({ _id: req.params.id }, req.body);

        //* response from updateOne : {
        // "acknowledged": true, // if update methods ends successfuly.
        // "modifiedCount": 1, // if returns 0 : no any data updated cause data is already up to date.
        // "upsertedId": null, //  No new document was inserted. Combination of update and insert.
        // "upsertedCount": 0, // Since nothing was inserted, no new ID.
        // "matchedCount": 1 // number of data matches with our filter.
        // }

        // const result = await BlogCategory.findOneAndUpdate({ _id: req.params.id }, req.body);
        const result = await BlogCategory.findByIdAndUpdate(req.params.id, req.body, { new: true });

        if (!result) {
            res.errorStatusCode = 404
            throw new Error('Data is not found and not updated');
        }

        res.status(200).send({
            error: false,
            result,
            // new: await BlogCategory.findById(req.params.id)
        })
    },

    delete: async (req, res) => {

        const result = await BlogCategory.deleteOne({ _id: req.params.id });

        if (result.deletedCount) {
            res.sendStatus(204);
        } else {
            res.errorStatusCode = 404
            throw new Error('Data is not found and or already deleted');
        }

    }

}


module.exports.blogPost = {

    list: async (req, res) => {

        const result = await BlogPost.find();

        res.status(200).send({
            error: false,
            result
        });
    },

    // CRUD Operations

    create: async (req, res) => {

        // const userId = req.session._id
        // console.log(userId);

        //* before userControl middleware
        // if (!req.session._id) {
        //     throw new Error('You must login to create a post')
        // }
        // req.body.userId = req.session._id;

        //* after userControl middleware
        
        // console.log(req.user);
        if (!req.user) {
            throw new Error('You must login to create a post')
        }
        req.body.userId = req.user?._id

        const result = await BlogPost.create(req.body);

        res.status(201).send({
            error: false,
            result
        })
    },

    read: async (req, res) => {

        const result = await BlogPost.findById(req.params.id);

        res.status(200).send({
            error: false,
            result
        })
    },

    update: async (req, res) => {

        const result = await BlogPost.findByIdAndUpdate(req.params.id, req.body, { new: true });

        if (!result) {
            res.errorStatusCode = 404
            throw new Error('Data is not found and not updated');
        }

        res.status(200).send({
            error: false,
            result,
        })
    },

    delete: async (req, res) => {

        const result = await BlogPost.deleteOne({ _id: req.params.id });

        if (result.deletedCount) {
            res.sendStatus(204);
        } else {
            res.errorStatusCode = 404
            throw new Error('Data is not found and or already deleted');
        }

    }
}