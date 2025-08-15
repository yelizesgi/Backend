"use strict";
/* ------------------------------------- *
                    Routes
/* ------------------------------------- */

const router = require('express').Router();

router.get('/', (req, res) => res.send({ method: 'GET' }));
router.post('/', (req, res) => res.send({ method: 'POST' }));
router.put('/', (req, res) => res.send({ method: 'PUT' }));
router.delete('/', (req, res) => res.send({ method: 'DELETE' }));

module.exports = router