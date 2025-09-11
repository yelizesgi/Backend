"use strict";
/* -------------------------------------------------------
    EXPRESSJS - Entity Project with Sequelize
------------------------------------------------------- */

const ecpress = require('express');
const app = express();

require("dotenv").config();
const PORT = process.env.PORT || 8000;

/*------------------------------------------------------- */

//! Accept json data and convert to object:
app.use(express.json());

/*------------------------------------------------------- */
//? SEQUELIZE
//! npm i sequelize sqlite3

const {Sequelize, DataTypes} = require('sequelize');





/*------------------------------------------------------- */
/*------------------------------------------------------- */
/*------------------------------------------------------- */

const errorHandler = (err, req, res, next) => {
    const statusCode = res.errorStatusCode ?? 500
    console.log('errorHandler worked.')
    res.status(errorStatusCode).send({
        error: true, //? special data
        message: err.message, // error string message
        cause: err.cause, // error option cause
        stack: err.stack //error details
    })
}

app.use(errorHandler);

/*------------------------------------------------------- */

app.listen(PORT, ()=> console.log("Runnig at: http://127.0.0.1:" + PORT));
/*------------------------------------------------------- */