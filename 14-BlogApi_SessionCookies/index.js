"use strict";
/* -------------------------------------------------------
     EXPRESSJS - BLOG Project with Mongoose
------------------------------------------------------- */

const express = require('express');
const app = express();

require('dotenv').config();
const PORT = process.env.PORT || 8000
const HOST = process.env.HOST || 'localhost'

/* ------------------------------------------------------- */
// Middlewares & Configs

// Accept and Parse data
app.use(express.json());

// SessionCookie
// $ npm install cookie-session
const session = require('cookie-session');
app.use(session({
     secret: process.env.PASS_SALT,
     // maxAge:1000 * 60 * 60 * 24 * 3 // 3 days in miliseconds // now this is a cookie. 
}));

// User Control (check user data from session)
app.use(require('./src/middlewares/userControl'));

// DB Connection
// const dbConnection = require('./src/dbConnection');
// dbConnection()
require('./src/dbConnection')();

/* ------------------------------------------------------- */
// Routes
app.all('/', (req, res) => {
     res.send({
          message: 'Welcome to Blog Api',
          session: req.session
     })
});

// Blog route
app.use('/blogs', require('./src/routes/blogRouter'));
app.use('/users', require('./src/routes/userRouter'));

/* ------------------------------------------------------- */
// ErrorHandler
app.use(require('./src/middlewares/errorHandler'));

/* ------------------------------------------------------- */
app.listen(PORT, () => console.log(`Running at: http://${HOST}:${PORT}`));