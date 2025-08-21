"use strict";
/* -------------------------------------------------------
    EXPRESSJS - MIDDLEWARES
------------------------------------------------------- */

const express = require("express");
const app = express();

require("dotenv").config();
const PORT = process.env.PORT || 8000;

/* ------------------------------------------------------- *
//? Middleware functions must be has three parameters. 
//? Last parameter is for next().

// Middleware:
app.get('/', (req, res, next) => {

    console.log('middleware çalıştı.')

    // next işlemi bir sonraki route'a havale eder.
    // next()
    // next bir sonraki route gideceği için sonrasının bir önemi yok.
    // res.send({
    //     message: 'middleware'
    // })

    if (req.query.courseName == 'clarusway') {
        next()
    } else {
        res.send({
            message: 'Kurs ismi yanlış girildi.'
        })
    }

})

// Route-Path:
app.get('/', (req, res) => {

    console.log('route-path çalıştı.')

    res.send({
        message: 'Hello World'
    })

})

/* ------------------------------------------------------- *

app.get('/', (req, res, next) => {

    console.log('middleware çalıştı.')

    // Bir sonraki controller'a data gönderme:
    // req:
    req.message = 'Hello world from middleware'
    // res:
    if (req.query.course == 'clarusway') {
        res.message = 'Doğru yerdesiniz.'
    } else {
        res.message = 'acaba doğru yerde misiniz?'
    }

    next()

})

// Route-Path:
app.get('/', (req, res) => {

    console.log('route-path çalıştı.')

    res.send({
        // message: req.message
        message: res.message
    })

})

/* ------------------------------------------------------- *

app.get('/', (req, res, next) => {
    console.log('middleware-1 çalıştı.')
    req.message1 = 'middleware-1'
    next()
})
app.get('/', (req, res, next) => {
    console.log('middleware-2 çalıştı.')
    req.message2 = 'middleware-2'
    next()
})
app.get('/', (req, res, next) => {
    console.log('middleware-3 çalıştı.')
    req.message3 = 'middleware-3'
    next()
})
app.get('/', (req, res, next) => {
    console.log('middleware-4 çalıştı.')
    req.message4 = 'middleware-4'
    next()
})

// Route-Path:
app.get('/', (req, res) => {

    res.send({
        message: 'Sorun yok.',
        message1: req.message1,
        message2: req.message2,
        message3: req.message3,
        message4: req.message4,
    })

})

/* ------------------------------------------------------- */


// app.get('/', (req, res, next) => {
//     console.log('middleware-1 çalıştı.')
//     next()
// })

// const middleware1 = (req, res, next) => {
//     console.log('middleware-1 çalıştı.')
//     next()
//     // next('route')
// }

// const middleware2 = (req, res, next) => {
//     console.log('middleware-2 çalıştı.')
//     next()
// }

// app.get('/', middleware1)
//? use ile middleware çağırabiliriz:
// app.use(middleware1)
// app.use(middleware2)
//? Tek use içinde virgülle ayırp kullanabiliriz:
// app.use(middleware1, middleware2)
// app.use(middleware2, middleware1)
//? Array içinde çağırabiliz:
// app.use([middleware1, middleware2])
//? URL'ye özel middlewares:
// app.use('/test', [middleware1, middleware2]) // use() methodu all() methodu gibi tüm methodlara izin verir.
// app.get('/test', [middleware1, middleware2]) // sadece get() için çalışır
//? Middlewareleri direk route-controller öncesinde de çağırabiliriz:
// app.all('/*', [middleware1, middleware2], (req, res) => {

//     res.send({
//         message: 'Sorun yok.',
//     })

// })
// app.get('/*', (req, res) => {

//     res.send({
//         message: 'next(route).',
//     })

// })

/* ------------------------------------------------------- */
// Ayrı dosyadan çağırma:

// const middlewares = require('./middlewares/') // Array
// const { middleware1, middleware2, middleware3 } = require('./middlewares/') // Object

// app.get('/*', middleware1, middleware2, middleware3, (req, res) => {

//     res.send({
//         message: 'middlewares/index',
//     })

// })

const middlewares = require('./middlewares/') // Object

app.get('/*', middlewares.middleware1, middlewares.middleware2, middlewares.middleware3, (req, res) => {

    res.send({
        message: 'middlewares/index',
    })

})



/* ------------------------------------------------------- */

app.listen(PORT, () => console.log("Running: http://127.0.0.1:" + PORT));