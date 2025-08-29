"use strict";
/* -------------------------------------------------------
     EXPRESSJS - BLOG Project with Mongoose
------------------------------------------------------- */

const express = require('express');
const app = express();


const PORT = process.env.PORT || 8000
const HOST = process.env.HOST || 'localhost'

/* ------------------------------------------------------- */
//? Middlewares & Configs
require('dotenv').config();


//? Accept and Parse data
app.use(express.json());

//? DB Connection
//? const dbConnection = require('./src/dbConnection');
//? dbConnection()
require('./src/dbConnection')();

/* ------------------------------------------------------- */
//? Routes
app.all('/', (req, res) => res.send('Welcome to Blog Api'));

//? Blog route
app.use('/blogs', require('./src/routes/blogRouter'));
app.use('/users', require('./src/routes/userRouter'));

/* ------------------------------------------------------- */
//? ErrorHandler
app.use(require('./src/middlewares/errorHandler'));

/* ------------------------------------------------------- */
app.listen(PORT, () => console.log(`Running at: http://${HOST}:${PORT}`));