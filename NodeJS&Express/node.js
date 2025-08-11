"use strict";
/* -------------------------------------- *
                NODEJS
/* -------------------------------------- *
// HTTPSERVER:


const http = require('node:http');

// http.createServer(()=>{...})

const app = http.createServer((request, response) => {

    response.end('Hello CH19')
    console.log('this is for console');
    
});

app.listen(8000, 'localhost', ()=> console.log('Server Started: http://localhost:8000'))


/* -------------------------------------- *

const http = require('node:http');


const app = http.createServer((req, res) => {

    // console.log(req);
    // console.log(res);

    // console.log(req.url);

    if (req.url == '/') {
        
        res.end('You are home page')

    } else if (req.url == '/about') {
        
        res.end('You are about page')
        
    } else {
        
        res.end('You are lost')
    }

});


// Default server domain: local domain -> localhost -> 127.0.0.1
app.listen(8000, () => console.log('Server Started: http://localhost:8000'));

/* -------------------------------------- */

const http = require("node:http");

const app = http
  .createServer((req, res) => {
    // console.log(req);
    // console.log(res);

    console.log(req.method);

    if (req.url == "/") {
      if (req.method == "GET") {
        // res.write('write - 1')
        // res.write('write - 2')
        // res.write('write - 3')

        const obj = {
          key: "value",
        };

        res.end(JSON.stringify(obj));
      }
    } else if (req.url == "/about") {
      res.end("You are about page");
    } else {
      res.end("You are lost");
    }
  })
  .listen(8000, () => console.log("Server Started: http://localhost:8000"));
