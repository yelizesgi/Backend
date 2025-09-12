"use strict"
/* -------------------------------------------------------
    EXPRESS - Personnel API
------------------------------------------------------- */
// app.use(errorHandler):

module.exports = (err, req, res, next) => {
    // console.log(err.statusCode);
    return res.status(err?.statusCode || 500).send({
        error: true,
        message: err.message,
        cause: err.cause,
        body: req.body
    });
}