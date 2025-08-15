"use strict";
/* ------------------------------------- *
                    Routes
/* ------------------------------------- */

//* npm init -y => create package.json
//* creating .env and .gitignore
//* npm i express dotenv


const express = require('express');
const app = express()

require('dotenv').config();
const PORT = process.env.PORT ?? 8000;
/* ------------------------------------- *

// app.route('/').get((req, res) => res.send({ method: 'GET' }));

//* "Router" is special app for URL control in Express
const router = require('express').Router();

router.get('/', (req, res) => res.send({ method: 'GET' }));
router.post('/', (req, res) => res.send({ method: 'POST' }));
router.put('/', (req, res) => res.send({ method: 'PUT' }));
router.delete('/', (req, res) => res.send({ method: 'DELETE' }));

app.use(router);
/* ------------------------------------- */
//* Import router
// const router = require('./routes/index.js');
// const router = require('./routes/index');
// const router = require('./routes');
// app.use(router);

app.use(require('./routes'));

/* ------------------------------------- */
app.listen(PORT, () => console.log('Running at: http://127.0.0.1:' + PORT));