"use strict";
/* -------------------------------------------------------
        EXPRESSJS - TODO Project with Sequelize
------------------------------------------------------- */
//* npm init -y => create package.json
//* creating .env and .gitignore
//* npm i express dotenv sequelize sqlite3


const express = require('express');
const app = express();

// disaridan gelen veriyi parse et ve kabul et
app.use(express.json());

require('dotenv').config();
const PORT = process.env.PORT ?? 8000;

/* ------------------------------------------------------- */
// app.all('/', (req, res) => res.send('Welcome to Todo API'));

// MODELS:

const { Sequelize, DataTypes } = require('sequelize');

// 1. creating a new instance from Sequelize Class.
const sequelize = new Sequelize('sqlite:./db.sqlite3'); // dataBase : dbName

// 2. creating a model (table)
// sequelize.define('tableName', { ...tableDetails });

const Todo = sequelize.define('todos', {

    // ilk sutun olarak id sutunu sequelize tarafindan otomatik oluturulur.
    // id: {
    //     type: DataTypes.BIGINT,
    //     allowNull: false, // default: true
    //     unique: true, // default: false
    //     primaryKey: true, // default: false
    //     autoIncrement: true, // default: false
    //     defaultValue: 1, // default: null
    //     comment: 'this is id and must be unique',
    //     field: 'custom_name'
    // }

    title: {
        type: DataTypes.CHAR,
        allowNull: false
    },

    description: DataTypes.TEXT, // kisayol kullanimi

    priority: { // -1: Low, 0: Normal, 1: High
        type: DataTypes.SMALLINT,
        allowNull: false,
        defaultValue: 0
    },

    isDone: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
    },

    // newField: DataTypes.BOOLEAN

    // createdAt ve updatedAt tanimlamana gerek yok bunu sequelize tanimlar.
});

// 3. Syncronization: Model biligilerini db'ye uygula. Sadece bir kere calistirilmali.
// sequelize.sync(); // CREATE A TABLE
// sequelize.sync({ force: true }); // DROP TABLE & CREATE TABLE
// sequelize.sync({ alter: true }); // BACKUP TABLE & DROP TABLE & CREATE TABLE FROM BACKUP

// 4. Coneccet to db:s
sequelize.authenticate()
    .then(() => console.log('* DB Connected *'))
    .catch((error) => console.log('! DB Not Connected !', error));

/* ------------------------------------------------------- */
// ROUTES:

const router = express.Router();

// LIST TODOS:
router.get('/', async (req, res) => {

    // const data = await Todo.findAll() // SELECT * FROM todos
    const data = await Todo.findAndCountAll();

    res.status(200).send({
        error: false,
        result: data
    })
});


//! CRUD Operations:

//? Create
router.post('/', async (req, res) => {

    // const data = await Todo.create({
    //     "title": "title-1",
    //     "description": "description-1",
    //     "priority": 1,
    //     "isDone": false
    // });

    // console.log(req.body);
    const data = await Todo.create(req.body);

    res.status(201).send({
        error: false,
        result: data
    })
});

//? Read
router.get('/:id', async (req, res) => {

    // const data = await Todo.findOne({ where: { id: req.params.id } });
    const data = await Todo.findByPk(req.params.id);

    res.status(200).send({
        error: false,
        result: data
    });

})

// Todo: update ve delete

//? Update Todo
router.put('/:id', async (req, res) => {

    // await Todo.update({ ...newData }, { ...where });
    // update() methodu bir array dondurur. basarili ise [1] basarisiz ise [0]
    const data = await Todo.update(req.body, { where: { id: req.params.id } });

    if (data[0] === 0) {
        throw new Error('Update is not completed !')
    }

    res.status(202).send({
        error: false,
        result: data
    })
});

//? Delete Todo
router.delete('/:id', async (req, res) => {

    // await Todo.destroy({...where})
    // destroy() mehtod,  0 basarisiz 1 basarili oldugunda dondurur.
    const data = await Todo.destroy({ where: { id: req.params.id } });
    // console.log(data);

    if (data > 0) {
        res.sendStatus(204);
    } else {
        throw new Error('Data is not deleted or not found!');
    }


});





app.use(router);
/* ------------------------------------------------------- */
// Error handler:
const errorHandler = (err, req, res, next) => {

    const statucCode = req.errStatusCode ?? 500;

    res.status(statucCode).send({
        error: true,
        message: err.message,
        cause: err.cause,
        stack: err.stack
    });
}

app.use(errorHandler);

/* ------------------------------------------------------- */
app.listen(PORT, () => console.log('Running at: http://127.0.0.1:' + PORT));