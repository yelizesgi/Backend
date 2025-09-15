"use strict"
/* -------------------------------------------------------
    EXPRESS - Personnel API
------------------------------------------------------- */
const router = require('express').Router()
const { list, create, read, update, dlt } = require('../controllers/personnel.controller');
const { isLogin } = require('../middlewares/permissions');
/* ------------------------------------------------------- */
// URL: /personnels

router.use(isLogin);

router.route('/').get(list).post(create);

router.route('/:id').get(read).put(update).delete(dlt);

/* ------------------------------------------------------- */
module.exports = router