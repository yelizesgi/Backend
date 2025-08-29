"use strict";
/* -------------------------------------------------------
     EXPRESSJS - BLOG Project with Mongoose
------------------------------------------------------- */

const router = require('express').Router();
const { blogCategory, blogPost } = require('../controllers/blogController');

/* ------------------------------------------------------- */

// URL: /blogs ->

// BlogCategory
router.route('/categories')
    .get(blogCategory.list)
    .post(blogCategory.create);

router.route('/categories/:id')
    .get(blogCategory.read)
    .put(blogCategory.update)
    .patch(blogCategory.update)
    .delete(blogCategory.delete);

// BlogPost
router.route('/posts')
    .get(blogPost.list)
    .post(blogPost.create);

router.route('/posts/:id')
    .get(blogPost.read)
    .put(blogPost.update)
    .patch(blogPost.update)
    .delete(blogPost.delete);
/* ------------------------------------------------------- */
module.exports = router;