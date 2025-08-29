"use strict";
/* ------------------------------------- *
                ErrorHandlers
/* ------------------------------------- */

const express = require('express');
const app = express();

require('dotenv').config();
const PORT = process.env.PORT ?? 8000;

/* ------------------------------------- *
//! 1- throw error :  Hata gönder ve sistemi kilitle (kodlar işlemeye devam etmez) // Block Code
app.get('/user/:id', function (req,res,next) {
    // throw new Error('Not Found Error one way')
    // res.send({
    //     id: req.params.id,
    //     message: 'First way error'
    // })

   if(isNaN(req.params.id)){
     res.errorStatusCode = 400 //? errorHandler'a statusCode gönderdik.

     throw new Error('ID parameters must be number')
   } else{
      res.send('ID wright')
   }


} )


/* ------------------------------------- */
//! 2- try catch error :

app.get('/user/:id', function(req, res, next){
    try {
        if(isNaN(req.params.id)){
     res.errorStatusCode = 400 //? errorHandler'a statusCode gönderdik.

     throw new Error('ID parameters must be number')
   } else{
      res.send('ID wright, everbody success')
   }
    } catch (error) {
        //! Hata oluşursa catch() çalışır ve hata err parametresi ile gönderilir.
         //! next(error) ile hatayı errorHandler'a gönderebiliriz:
        res.status(400).send({
            error: true,
            message: error.message
        })
    }
})










/* ------------------------------------- */
/* ------------------------------------- */
/* ------------------------------------- */


app.listen(PORT, ()=> console.log('Running at: http://127.0.0.1:' + 8000))

/* ------------------------------------- */