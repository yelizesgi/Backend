"use strict";
/* ------------------------------------- *
                Middlewares
/* ------------------------------------- */

//! 1. npm init -y packet-json projeye dahil edildi
//! 2. npm i express dorenv

//? 1-Projemin bir espress projesi olacağını belirtiyorum

const express = require('express');

//? 2-Express i projeme tanıtıyorum

const app = express();

//? 3-dotenv config ayarlarını yapıyorum

require('dotenv').config();

const PORT = process.env.PORT ?? 8000;


const firstmiddle = (req, res, next) =>{
    res.send({
        message: 'firstmiddle succesful'
    })
    next()
}





//* Routh path

app.get('/', (req, res)=>{
    console.log('Bu bir routh path')
    res.send({
        message: 'Hello World'
    })

})




//? Server ayağı kaldırılıyor
app.listen(PORT, ()=> console.log('Running at: http://127.0.0.1: + PORT'))