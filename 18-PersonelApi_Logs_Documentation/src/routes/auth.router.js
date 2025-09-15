"use strict"
/* -------------------------------------------------------
EXPRESS - Personnel API
------------------------------------------------------- */

const { login, logout } = require('../controllers/auth.controller');
const router = require('express').Router();

/* ------------------------------------------------------- */
// URL: /auth

router.post('/login', login);
router.get('/logout', logout);

/* ------------------------------------------------------- */
module.exports = router;