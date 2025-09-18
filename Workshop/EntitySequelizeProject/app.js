"use strict";
/* -------------------------------------------------------
    EXPRESSJS - Entity Project with Sequelize
------------------------------------------------------- */

const express = require('express');
const app = express();

require("dotenv").config();
const PORT = process.env.PORT || 8000;

/*------------------------------------------------------- */

//! Accept json data and convert to object:
app.use(express.json());

/*------------------------------------------------------- */
//? SEQUELIZE
//! npm i sequelize sqlite3

const {Sequelize, DataTypes} = require('sequelize');

//? Connection Object

//v1
// const sequelize = new Sequelize('sqlite:./dbsqlite3');

//v2
// const sequelize = new Sequelize('sqlite:' + (process.env.SQLITE));

//v3

const sequelize = new Sequelize('sqlite:' + (process.env.SQLITE || './db.sqlite3'));

/*------------------------------------------------------- */
//? SEQUELIZE MODEL:
// Her bir model, veritabanında bir tabloya karşılık gelir.
// sequelize.define('tableName', { ...columns })

const Entity = sequelize.define('entitys', {
    
    //! ID sutunu belirtmeye gerek yoktur. Sequelize ID sutununun otomatik oluşturur:
    
    // id:{
    //     type: DataTypes.INTEGER,// DataType // sutun veri tipi.
    //     allowNull: false,// default: true // sutun verisi boş olabilir mi?
    //     unique: true, // default: false benzersiz kayıt mı?
    //     defaultValue: 0, // Kayıt eklendiğinde default olarak ne yazılsın?
    //     autoIncrement: true, // default: false, // Sutun değeri her bir jayıtta otomatik olarak +1 artsın mı?
    //     primaryKey: true, // default: false // tablonun her bir kaydını ifade eden benzersiz numara.
    //     // comment: 'yorum eklenebilir',
    //     //field: 'custom_field_name'
    // }

   title: {
      type: DataTypes.STRING(256), // vachar(256)
      allowNull: false,
   },

   description: DataTypes.TEXT, //ShortHand

   is_completed: { // 1: High, 0: Normal, -1: Low
    type: DataTypes.TINYINT,
    allowNull: false,
    defaultValue:0 
   },

   due_date: DataTypes.DATE,
   // createdAt ve updatedAt tanımlamaya gerek yok. Otomatik oluşturulur.

});


//!Syncronization:(Bir kere çalıştır)
// Modelleri veritabanına uygula:
// sequelize.sync()// CREATE TABLE // First Command.
// sequelize.sync({ force: true }) // DROP TABLE & CREATE TABLE
// sequelize.sync({ alter: true }) // TO BACKUP & DROP TABLE & CREATE TABLE & FROM BACKUP Bu tercih edilmeli

//?Connect to DB
sequelize.authenticate()
.then(() => console.log('* DB Connected*'))
.catch(() => console.log('! DB Not Connected !'))

/*------------------------------------------------------- */
/*------------------------------------------------------- */

const errorHandler = (err, req, res, next) => {
    const statusCode = res.errorStatusCode ?? 500
    console.log('errorHandler worked.')
    res.status(errorStatusCode).send({
        error: true, //? special data
        message: err.message, // error string message
        cause: err.cause, // error option cause
        stack: err.stack //error details
    })
}

app.use(errorHandler);

/*------------------------------------------------------- */

app.listen(PORT, ()=> console.log("Runnig at: http://127.0.0.1:" + PORT));
/*------------------------------------------------------- */