"use strict"

const { version } = require('mongoose');

/* -------------------------------------------------------
    EXPRESS - Personnel API
------------------------------------------------------- */
// Swagger Autegen
// https://swagger-autogen.github.io/docs/

require('dotenv').config();

const HOST = process.env.HOST || '127.0.0.1';
const PORT = process.env.PORT || 8000;

/* ------------------------------------------------------- *
const options = {
    openapi:          <string>,     // Enable/Disable OpenAPI.                        By default is null
    language:         <string>,     // Change response language.                      By default is 'en-US'
    disableLogs:      <boolean>,    // Enable/Disable logs.                           By default is false
    autoHeaders:      <boolean>,    // Enable/Disable automatic headers recognition.  By default is true
    autoQuery:        <boolean>,    // Enable/Disable automatic query recognition.    By default is true
    autoBody:         <boolean>,    // Enable/Disable automatic body recognition.     By default is true
    writeOutputFile:  <boolean>     // Enable/Disable writing the output file.        By default is true
};
/* ------------------------------------------------------- */

const swaggerAutgen = require('swagger-autogen')();

const packageJson = require('./package.json')

const document = {
    // info: {
    //     version: '1.0.0',
    //     title: "Personnel API",
    //     description: 'Personnel Management System Service v.1',
    //     termOfService: "http://127.0.0.1:8000/#",
    //     contact: {
    //         name: 'Clarusway', email:'clarusway@gmail.com'
    //     },
    //     licence: {
    //         name: 'Apache Licence'
    //     },
    // }
    info: {
        version: packageJson.version,
        title: packageJson.name,
        description: packageJson.description,
        // termOfService: "http://127.0.0.1:8000/#",
        contact: { name: packageJson.author, email: packageJson.email },
        licence: { name: packageJson.license }
    },

    schemes: ['http', 'https'],
    host: `${HOST}:${PORT}`,
    baseUrl: '/',
    securityDefinitions: {
        Token: {
            type: 'apiKey',
            in: 'header',
            name: 'Authorization',
            description: 'Simple Token Authentication * Example Use: <b>Token ...tokenKey...</b>'
        }
    },
    security: [{ Token: [] }],

    definitions: {
        'Department': require('./src/models/department.model').schema.obj,
        'Personnel': require('./src/models/personnel.model').schema.obj,
    }

}

// To run swaggerAutogen: node swaggerAutgen.js
// swaggerAutgen('outputFile', routes, document )
swaggerAutgen('./swagger.json', ['./index.js'], document);