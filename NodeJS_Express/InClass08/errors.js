"use strict";
/* ------------------------------------- *
            Error Mangament
/* ------------------------------------- */

const express = require("express");
const app = express();

require("dotenv").config();
const PORT = process.env.PORT || 8000;


/* ------------------------------------------------------- */

app.get('/user/:id', (req, res) => {

    const id = req.params.id

    if (isNaN(id)) {

        req.errStatusCode = 400
        throw new Error('id is not a number', { cause: `params.id=${id}` }); // this is our custom error

    } else {
        res.send({ id })
    }

});


/* ------------------------------------------------------- *
// TRY-CATCH

app.get('/user/:id', (req, res, next) => {

    const id = req.params.id
    // console.log(HOST); // can run away from error handler

    try {
        if (isNaN(id)) {

            throw new Error('id is not a number', { cause: `params.id=${id}` });

        } else {
            res.send({ id })
        }
    } catch (error) {
        console.log('try-catch');
        next(error) // if we send a parameters into next. Next will send it to error handler
    }

});

/* ------------------------------------------------------- *

//! This is not required if you are using express 5
// express-async-errors
// $ npm i express-async-errors
require('express-async-errors')

app.get('/async', async (req, res, next) => {
    throw new Error('Created error in async-func')
})


/* ------------------------------------------------------- */


const errorHandler = (error, req, res, next) => {
    // console.log(error);

    const statusCode = req.errStatusCode ?? 500;

    res.status(statusCode).send({
        error: true, 
        message: error.message, // error message (string)
        cause: error.cause, // error cause (optional)
        // stack: error.stack // Error details
    });
};

app.use(errorHandler);

/* ------------------------------------------------------- */
app.listen(PORT, () => console.log("Running: http://127.0.0.1:" + PORT));