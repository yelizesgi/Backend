"use strict"
/* -------------------------------------------------------
    EXPRESS - Personnel API
------------------------------------------------------- */
const router = require('express').Router();
const { list, create, read, update, dlt, personnels } = require('../controllers/department.controller');
const { isLogin, isAdmin, isAdminOrLead } = require('../middlewares/permissions');
/* ------------------------------------------------------- */
// URL: /departments

// router.use(isLogin);

router.route('/')
    .get(isLogin, list)
    .post(isAdmin, create);

router.route('/:id')
    .get(isLogin, read)
    .put(isAdmin, update)
    .delete(isAdmin, dlt);

router.get('/:id/personnels', isAdminOrLead, personnels)

/* ------------------------------------------------------- */
module.exports = router