"use strict";
/* ------------------------------------- *
                Middlewares
/* ------------------------------------- */

const express = require('express');
const app = express();

require('dotenv').config();
const PORT = process.env.PORT ?? 8000;
/* ------------------------------------- *
//* Middleware is a fucntion and must have three parameters.
//* App.use() -> Runs in every request and response.( Middleware and Routes)

//* Functional Middleware

const middleware1 = (req, res, next) => {

    console.log('Middleware1 worked.');

    next(); // go to next route or middleware
};

const middleware2 = (req, res, next) => {

    console.log('Middleware2 worked.');

    next();
};

// 1. way runs for each request
// app.use(middleware2);
// app.use(middleware1);

// 2. way runs for each request
// app.use(middleware1, middleware2);

// 3. way specific route
// app.use('/api', middleware1);
// app.use('/books', middleware2);

// app.get('/api', (req, res) => {

//     console.log('this is main route');

//     res.send({
//         message: 'Welcome'
//     })
// });

// app.get('/books', (req, res) => {

//     console.log('this is books route');

//     res.send({
//         message: 'Which book you wanna read today ?'
//     })
// });


// 4. way you can use them between route and controller

app.get('/api', [middleware2, middleware1], (req, res) => {

    console.log('this is main route');

    res.send({
        message: 'Welcome'
    })
});


/* ------------------------------------- *

//* Middleware 
// this middleware chose to run according to method and url. 
app.get('/', (req, res, next) => {

    // console.log(req);
    req.name = 'alican'; //sending a data to next function or routes

    next();

});

app.get('/', (req, res, next) => {

    req.name2 = 'raife';

    next();

});


app.get('/', (req, res) => {

    res.send({
        message: `Welcome ${req.name}, ${req.name2}`,
    })
});

/* ------------------------------------- */
//* import middlewares

const { middleFn1, middleFn2 } = require('./middlewares');


app.get('/', [middleFn1, middleFn2], (req, res) => {

    res.send({
        message: `Welcome ${req.name}, ${req.name2} and ${req.name3}`,
    })
});


/* ------------------------------------- */
app.listen(PORT, () => console.log('Running at: http://127.0.0.1:' + PORT));