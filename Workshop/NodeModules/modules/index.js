"use strict";
//* -------------------------------------------------------
                        //! MODULES
/*------------------------------------------------------- 

//* 1-Fonction creation
const testing = function(){
    console.log('My first testing');
};


//* 2- Function export v1
module.exports = testing;

//* 2- Function export v2
module.exports = function(){
    console.log('My first testing');
};

------------------------------------------------------- *

const testing1 = function(){
    console.log('My first testing1');
};
const testing2 = function(){
    console.log('My first testing2');
};
const testing3 = function(){
    console.log('My first testing3');
};

//* 3- Function export v3

// module.exports = [testing1, testing2, testing3];

//* 4- Function export v4
//  module.exports= {
//     testing1 : testing1,
//     testing2 : testing2,
//     testing3 : testing3
//  }

// module.exports = {testing1, testing2, testing3};

/*------------------------------------------------------- *

//* 5- Function export v5

module.exports.testing1 = function(){
    console.log('My first testing1');
};
module.exports.testing2 = function(){
    console.log('My first testing2');
};
module.exports.testing3 = function(){
    console.log('My first testing3');
};

/*------------------------------------------------------- */

//6- Function export v6

module.exports ={

testing1 : function(){
    console.log('My first testing1');
},

testing2 : function(){
    console.log('My first testing2');
},

testing3 : function(){
    console.log('My first testing3');
}

}

