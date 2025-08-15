"use strict";

/* -------------------------------------------------------
                        MODULES
------------------------------------------------------- */

//? Baska bir JS dosyasini ice aktarma:
// require('./modules/index.js');
// require('./modules/index');
// require('./modules');

/* ------------------------------------------------------- *

//* Import 
const test = require('./modules');
test();

/* ------------------------------------------------------- *

//* Import v2 (Shorthand for singleFunction exports)

require('./modules')();

/* ------------------------------------------------------- *
//* Import v3 (for array exports)

const arrFn = require('./modules'); //-> refers to : [test1, test2, test3]
// console.log(arrFn);

arrFn[0]();
arrFn[1]();
arrFn[2]();

/* ------------------------------------------------------- *

//! Order important in Array desctructing 
const [test1, test3, test2] = require('./modules'); //-> refers to : [test1, test2, test3]

test1();
test2();
test3();
/* ------------------------------------------------------- */
//* Import v4 (for object exports)

// const objFn = require('./modules');

// objFn.test1();
// objFn.test2();
// objFn.test3();

const { test3, test2, test1 } = require("./modules");
test1();
test2();
test3();
