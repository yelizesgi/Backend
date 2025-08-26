"use strict";
/* -------------------------------------------------------
    EXPRESSJS - BUILT-IN MIDDLEWARES
------------------------------------------------------- */

const express = require("express");
const app = express();

require("dotenv").config();
const PORT = process.env.PORT || 8000;

/* ------------------------------------------------------- */
//* Gelen Datayı Al:
//? Gelen JSON datayı kabul et:
app.use(express.json())
//? Gelen TEXT datayı kabul et:
app.use(express.text())
//? Gelen FORM-URL-ENCODED kabul et: <form action="">..submit..</form>
app.use(express.urlencoded({ extended: true })) // array olarak gelen form-datayı kabul et.

app.all('/', (req, res) => {

    res.send({
        params: req.params, // url'de params tanımlı olmalı.
        query: req.query,
        headers: req.headers,
        body: req.body
    })

})

// gelen urlye karşılık dosyayı bulacağın statik klasörü:
// app.use('/images', express.static('./images'))
app.use('/public', express.static('./images'))



/* ------------------------------------------------------- */
app.listen(PORT, () => console.log("Running: http://127.0.0.1:" + PORT));