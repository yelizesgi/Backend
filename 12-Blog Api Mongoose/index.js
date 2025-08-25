"use strict";
/* -------------------------------------------------------
     EXPRESSJS - BLOG Project with Mongoose
------------------------------------------------------- */

const express = require('express');
const app = express();

require('dotenv').config();
const PORT = process.env.PORT;
const HOST = process.env.HOST;

/* ------------------------------------------------------- */
// Middlewares & Configs

// Accept and Parse data
app.use(express.json());

// DB Connection
// const dbConnection = require('./src/dbConnection');
// dbConnection()
require('./src/dbConnection')();

/* ------------------------------------------------------- */
// Routes
app.all('/', (req, res) => res.send('Welcome to Blog Api'));

// Blog route
app.use(require('./src/routes/blogRouter'));


/* ------------------------------------------------------- */
// ErrorHandler
app.use(require('./src/middlewares/errorHandler'));

/* ------------------------------------------------------- */
app.listen(PORT, () => console.log(`Running at: http://${HOST}:${PORT}`));