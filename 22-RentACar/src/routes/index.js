"use strict";
/* -------------------------------------------------------
    | FULLSTACK TEAM | NODEJS / EXPRESS |
------------------------------------------------------- */
const router = require("express").Router();
/* ------------------------------------------------------- */
// ROUTER INDEX:

// URL: /

// auth:
router.use("/auth", require("./auth"));
// user:
router.use("/users", require("./user"));
// car:
router.use("/cars", require("./car"));
// reservation:
router.use("/reservations", require("./reservation"));

// document:
router.use("/document", require("./document"));

/* ------------------------------------------------------- */
module.exports = router;