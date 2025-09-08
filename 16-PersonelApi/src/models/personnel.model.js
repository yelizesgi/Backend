
"use strict"
/* -------------------------------------------------------
    EXPRESS - Personnel API
------------------------------------------------------- */
const { mongoose: { Schema, model } } = require('../configs/dbConnection');
const passwordEncrypt = require('../helpers/passwordEncrypt');
/* ------------------------------------------------------- */

const personnelSchema = new Schema({

    departmentId: {
        type: Schema.Types.ObjectId,
        ref: 'Department',
        required: true
    },

    userName: {
        type: String,
        trim: true,
        required: true,
        unique: true
    },

    password: {
        type: String,
        trim: true,
        required: true,
        // set: (password) => passwordEncrypt(password)
        set: passwordEncrypt
    },

    firstName: {
        type: String,
        trim: true,
        required: true,
    },

    lastName: {
        type: String,
        trim: true,
        required: true,
    },

    phone: {
        type: String,
        trim: true,
        required: true,
        // unique: true,
        match: [/^\d{11}$/, 'Phone number is not valid.']
    },

    email: {
        type: String,
        trim: true,
        required: true,
        unique: true,
        validate: [
            (email) => email.includes('@') && email.includes('.'),
            'Email is not valid.'
        ]
    },

    title: {
        type: String,
        trim: true,
        required: true,
    },

    salary: {
        type: Number,
        default: 0
    },

    description: {
        type: String,
        trim: true,
        required: true,
    },

    isActive: {
        type: Boolean,
        default: true
    },

    isAdmin: {
        type: Boolean,
        default: false
    },

    isLead: {
        type: Boolean,
        default: false
    },

    startedAt: {
        type: Date,
        default: Date.now()
    }

}, { collection: 'personnels', timestamps: true });

personnelSchema.set("toJSON", {
    transform: (doc, ret) => {
        ret.id = ret._id;
        delete ret._id;
        delete ret.__v;
        delete ret.password;
        ret.createdAt = ret?.createdAt.toLocaleDateString('tr-tr');
        ret.fullName = `${ret.firstName} ${ret.lastName}`
    }
});

// personnelSchema.virtual('fullName').get(function () {
//     return `${this.firstName} ${this.lastName}`
// });



module.exports = model('Personnel', personnelSchema);
