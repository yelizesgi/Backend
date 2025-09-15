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

// Cors
const cors = require('cors');
app.use(cors());

// Query Handler:
app.use(require('./src/middlewares/queryHandler'));

// Authentication:
app.use(require('./src/middlewares/authentication'));

// Logger:
app.use(require('./src/middlewares/logger'));

/* Logger  *
// yarn add morgan
// https://expressjs.com/en/resources/middleware/morgan.html

const morgan = require('morgan');

// app.use(morgan('tiny'));
// app.use(morgan('short'));
// app.use(morgan('dev'));
// app.use(morgan('common'));
// app.use(morgan('combined'));

// Custom log:
const customLog = 'TIME=":date[iso]" - URL=":url" - Method=":method" - IP=":remote-addr" - Ref=":referrer" - Status=":status" - Sign=":user-agent" - (:response-time[digits] ms)';
// app.use(morgan(customLog));

// Write to file;
const fs = require('node:fs');

// app.use(morgan(customLog, {
//     stream: fs.createWriteStream('./example.log')
//     // stream: fs.createWriteStream('./example.log', { flags: 'a+' })
// }));

// Write to file day to day
const now = new Date();
// console.log(now);
const today = now.toISOString().split('T')[0];
app.use(morgan(customLog, {
    stream: fs.createWriteStream(`./logs/${today}.log`)
}));
/* Logger  */


// Documentation
// yarn add swagger-autgen --dev
// yarn add swagger-ui-express --dev
// yarn add redoc-express --dev

// Json
app.use('/documents/json', (req, res) => {
    res.sendFile('swagger.json', { root: '.' });
});

// Swagger
const swaggerUi = require('swagger-ui-express');
const swaggerJson = require('./swagger.json');
app.use('/documents/swagger', swaggerUi.serve, swaggerUi.setup(swaggerJson, { swaggerOptions: { persistAuthorization: true } }));

// Redoc
const redoc = require('redoc-express');
app.use('/documents/redoc', redoc({ specUrl: '/documents/json', title: 'Redoc UI' }));


/* ------------------------------------------------------- */
// Routes

// Home Path
app.all('/', (req, res) => {

    res.status(200).send({
        error: false,
        message: 'Welcome to Personnel API Service',
        api: {
            documents: {
                swagger: 'http://localhost:8000/documents/swagger',
                redoc: 'http://localhost:8000/documents/redoc',
                json: 'http://localhost:8000/documents/json'
            }
        },
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