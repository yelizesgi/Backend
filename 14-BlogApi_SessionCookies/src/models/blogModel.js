"use strict";
/* -------------------------------------------------------
     EXPRESSJS - BLOG Project with Mongoose
------------------------------------------------------- */

const mongoose = require('mongoose');

/* ------------------------------------------------------- */
//* BlogCategory Schema

// Create a schema
const blogCategorySchema = new mongoose.Schema({

    // _id

    name: {
        type: String,
        trim: true,
        required: [true, 'Name field is required']
    }

}, {
    collection: 'blogCategories'
});

const BlogCategory = mongoose.model('BlogCategory', blogCategorySchema);

/* ------------------------------------------------------- */
//* BlogPost Schema

const blogPostSchema = new mongoose.Schema({

    // _id

    categoryId: { // default relation: ManyToOne 
        type: mongoose.Schema.Types.ObjectId,
        ref: 'BlogCategory', // model name for blog category
        required: true,
        // unique: true // convert to OneToOne relation
    },

    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },

    title: {
        type: String,
        required: true,
        trim: true
    },

    content: {
        type: String,
        required: true,
        trim: true
    },

    // createdAt
    // updatedAt

}, {
    collection: 'blogPosts',
    timestamps: true
});

const BlogPost = mongoose.model('BlogPost', blogPostSchema);

/* ------------------------------------------------------- */
module.exports = { BlogCategory, BlogPost };


/* ------------------------------------------------------- *

//* Sample
// Create Schema
// new mongoose.Schema({...fields}, {...options})

const nameSchema = new mongoose.Schema({

    // _id: // auto created and increment by mongodb

    fieldName1: Number,
    fieldName2: Boolean,

    fieldName3: {
        type: String,
        default: null,
        trim: true, // cuts the space before & after
        unique: true, // make it unique
        select: false, // if we dont want to send this field
        index: true, // make it faster reachable in search
        // required: true,
        required: [true, 'custom error message'],
        // enum: ['1', '2', '3'],
        // enum: [1, 2, 3],
        enum: [[1, 2, 3], 'custom error message'],
        // validate: () => true,
        validate: [() => true, 'custom error message'],
        get: () => { return data }, // it works default when we read oparation
        set: () => { return data }, // it works default when we create or update oparations
    }
}, {
    collection: 'collectionNames', // Table name
    timestamps: true // createdAt & updatedAt
});

// Convert schema to model
// mongoose.model('ModelName', nameSchema);

const ModelName = mongoose.model('ModelName', nameSchema);
/* ------------------------------------------------------- */