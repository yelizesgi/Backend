"use strict"
/* -------------------------------------------------------
    EXPRESS - Personnel API
------------------------------------------------------- */
/*
    $ npm i express dotenv mongoose
    $ npm i cookie-session
*/

const express = require('express');
const app = express();

// Nested Query
app.set("query parser", "extended");

require("dotenv").config();
const PORT = process.env?.PORT || 8000;

// Db Connection:
const { dbConnection } = require('./src/configs/dbConnection');
dbConnection()

/* ------------------------------------------------------- */
// Accept JSON:
app.use(express.json());

// Cookie-Session:
app.use(require('cookie-session')({
    secret: process.env.SECRET_KEY
}));

// Query Handler:
app.use(require('./src/middlewares/queryHandler'));

// Authentication:
app.use(require('./src/middlewares/authentication'));


/* ------------------------------------------------------- */
// Routes

// Home Path
app.all('/', (req, res) => {

    res.status(200).send({
        error: false,
        message: 'Welcome to Personnel API Service',
        session: req.session
    });
});


// auth
app.use('/auth', require('./src/routes/auth.router'));

// tokens
app.use('/tokens', require('./src/routes/token.router'));

// Deparments
app.use('/departments', require('./src/routes/department.router'));

// Personnels
app.use('/personnels', require('./src/routes/personnel.router'));





/* ------------------------------------------------------- */
// ErrorHandler:
app.use(require('./src/middlewares/errorHandler'))

// RUN SERVER:
app.listen(PORT, () => console.log('Running: http://127.0.0.1:' + PORT))

/* ------------------------------------------------------- */
// Syncronization (must be in commentLine):
// require('./src/helpers/sync')()