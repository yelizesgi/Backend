"use strict";
/* -------------------------------------------------------
     EXPRESSJS - BLOG Project with Mongoose
------------------------------------------------------- */

const router = require('express').Router();
const { blogCategory } = require('../controllers/blogController');

/* ------------------------------------------------------- */

// URL: /blogs ->

router.route('/blogs')
    .get(blogCategory.list)
    .post(blogCategory.create);

router.route('/blogs/:id')
    .get(blogCategory.read)
    .put(blogCategory.update)
    .patch(blogCategory.update)
    .delete(blogCategory.delete);

// todo: BlogPost route


/* ------------------------------------------------------- */
module.exports = router;