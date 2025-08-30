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

/* ------------------------------------------------ */

//! 3-ASYNC error


const asyncErr = async () =>{
    throw new Eror('This is async error')
}

app.get('/async', async (req, res, next) => {
    await asyncErr()
    .then() // Çıktıda hata yok
    .catch((err) => { nexr(err)}) // Çıktıda hata var
})


/* ------------------------------------- *
// express-async-errors
// $ npm i express-async-errors

//? Async fonksiyonlardaki hataları errorHandler'a yönlendir:

require('express-async-errors')

const asyncFunction = async () => {
    throw new Error('async-error')
}

app.get('/async', async (req, res, next) => {

    // await asyncFunction()
    res.errorStatusCode = 400
    throw new Error('async-error', { cause: 'async function içinde bir hatadır.' })

})

/* ------------------------------------- */
//! 4- ErrorHandler 4 parametreli olmak zorunda. Hata yakalayıcı parametre 1. parametredir.
//! ErrorHandler en sonda yer almalı (sayfanın en altında)

const errorHandler = (error, req, res, next) =>{

    console.log('ErrorHandler is working')

    const statusCode = res?.errorStatusCode || 500

    res.status(statusCode).send({
        error: true,
        message: error.message, // Hata mesajı
        cause: error.cause, // Hata neden oluştu ({ cause: '' })
        stack: error.stack, // Hata orjinal çıktısı
    })
    

}



/* ------------------------------------- */


app.listen(PORT, ()=> console.log('Running at: http://127.0.0.1:' + 8000))

/* ------------------------------------- */