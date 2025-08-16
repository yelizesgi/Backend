
"use strict";
//* -------------------------------------------------------
                        //! MODULES
//*------------------------------------------------------- */

//? 1-External JS import

//require('./modules.index.js');
//require('./modules.index');
//require('./modules'); //! default file index.js not writing


//? V1
// const practice = require('./modules');
// practice()

//?V2
// require('./modules')(); //! Shorthand import

//? Array import
// const arrFn = require('./modules');

// arrFn[0]();
// arrFn[1]();
// arrFn[2]();

//? Descturing array import
// const [testing1, testing2,testing3] = require('./modules');
// testing1();
// testing2();
// testing3();


//? Obje import
// const objFn = require('./modules');

// objFn.testing1();
// objFn.testing2();
// objFn.testing3();

//? Destrucring Obje İmport

const {testing1, testing2, testing3} = require('./modules');
testing1();
testing2();
testing3();


