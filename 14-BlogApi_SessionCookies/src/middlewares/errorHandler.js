"use strict";
/* -------------------------------------------------------
            EXPRESSJS - Error Handler
------------------------------------------------------- */

module.exports = (err, req, res, next) => {
    
    const statucCode = res.errorStatusCode ?? 500

    res.status(statucCode).send({
        error: true,
        message: err.message,
        cause: err.cause,
        stack: err.stack
    })
}