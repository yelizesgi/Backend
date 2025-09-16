"use strict"
/* -------------------------------------------------------
    | FULLSTACK TEAM | NODEJS / EXPRESS |
------------------------------------------------------- */
const router = require('express').Router()
const { list, create, read, update, dlt } = require('../controllers/order');
/* ------------------------------------------------------- */
// URL -> /orders

router.route('/').get(list).post(create);

router.route('/:id').get(read).put(update).delete(dlt);

/* ------------------------------------------------------- */
module.exports = router