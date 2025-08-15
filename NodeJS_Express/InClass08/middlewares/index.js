
"use strict";
/* ------------------------------------- *
                Middlewares
/* ------------------------------------- *


const middleFn1 = (req, res, next) => {

    console.log('Middleware1 worked.');

    next(); // go to next route or middleware
};

const middleFn2 = (req, res, next) => {

    console.log('Middleware2 worked.');

    next();
};

// module.exports = [middleFn1, middleFn2]
module.exports = { middleFn1, middleFn2 }

/* ------------------------------------- */

module.exports.middleFn1 = (req, res, next) => {

    console.log('Middleware1 worked.');

    next();
};

module.exports.middleFn2 = (req, res, next) => {

    console.log('Middleware2 worked.');

    next();
};

/* ------------------------------------- */

module.exports = {
    middleFn1: (req, res, next) => {

        req.name = 'Gorkem'
        req.name2 = 'Alican'

        console.log('Middleware1 worked.');

        next();
    },

    middleFn2: (req, res, next) => {

        req.name3 = 'Raife'

        console.log('Middleware2 worked.');

        next();
    }
}
