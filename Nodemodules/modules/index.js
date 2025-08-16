'use strict';

/* -------------------------------------------------------
                        MODULES
------------------------------------------------------- */

// console.log('this is from index.js');



/* ------------------------------------------------------- *
const test = function () {
    console.log('this is from index.js');
};

//* Export
module.exports = test; 

/* ------------------------------------------------------- *

//* Export v2

module.exports = function () {
    console.log('this is from index.js');
};

/* ------------------------------------------------------- *
//* Export v3

const test1 = function () {
    console.log('test 1 worked');
};

const test2 = function () {
    console.log('test 2 worked');
};

const test3 = function () {
    console.log('test 3 worked');
};

// module.exports = [test1, test2, test3]; // Exporting as a Array

// module.exports = { // Exporting as a Array
//     test1: test1,
//     test2: test2,
//     test3: test3
// };

module.exports = { test1, test2, test3 };

/* ------------------------------------------------------- *
//* Export v4

module.exports.test1 = function () {
    console.log('test 1 worked');
};


module.exports.test2 = function () {
    console.log('test 2 worked');
};

module.exports.test3 =function () {
    console.log('test 3 worked');
};


/* ------------------------------------------------------- */
//* Export v5

module.exports = {
    test1: function () {
        console.log('test 1 worked');
    },

    test2: function () {
        console.log('test 2 worked');
    },

    test3: function () {
        console.log('test 3 worked');
    }
}

