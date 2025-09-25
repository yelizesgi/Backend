"use strict";
/* -------------------------------------------------------
    | FULLSTACK TEAM | NODEJS / EXPRESS |
------------------------------------------------------- */
const router = require("express").Router();
const { list, create, read, update, dlt } = require("../controllers/user");
const { isLogin, isAdmin, isStaff } = require("../middlewares/permissions");

/* ------------------------------------------------------- */

// URL -> /users

router.route("/").get(list).post(create);
router.route("/:id").get(read).put(update).delete(isAdmin, dlt);

module.exports = router;