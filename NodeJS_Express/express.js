"use strict";
/* ------------------------------------------------------- *
                Express & Routing
/* ------------------------------------------------------- */
// https://expressjs.com/

//* npm init -y => create package.json
//* creating .env and .gitignore
//* npm i express dotenv

//? Express
const express = require("express"); // Assign expressFramwork to express variable
const app = express(); // Run application on express

//? Env
require("dotenv").config();
const PORT = process.env.PORT;
const HOST = process.env.HOST;

/* ------------------------------------------------------- *
//? HTTP Methods & Routes
// app.get('/', (req, res) => res.end('Called in "get" method.'));
// app.post('/', (req, res) => res.end('Called in "post" method.'));
// app.put('/', (req, res) => res.end('Called in "put" method.'));
// app.patch('/', (req, res) => res.end('Called in "patch" method.'));
// app.delete('/', (req, res) => res.end('Called in "delete" method.'));

//* Works for all methods
// app.all('/', (req, res) => res.end('Called in "all" method.'));

//* app.route('url') 
app.route('/')
    .get((req, res) => res.send({ method: 'GET' }))  //! .send te expres.js de arka plande stringfy çevirdiği için bu metod kullnılıyor
    .put((req, res) => res.send({ method: 'PUT' }))
    .post((req, res) => res.send({ method: 'POST' }))
    .delete((req, res) => res.send({ method: 'DELETE' }));

/* ------------------------------------------------------- */
//? URL Parameters

app.get("/blogs/:blogId/:author/search", (req, res) => {
  // console.log(req);

  res.send({
    blogId: req.params.blogId,
    query: req.query,
    url: {
      protocal: req.protocol,
      subdomains: req.subdomains,
      hostname: req.hostname,
      params: req.params,
      query: req.query,
      path: req.path,
      originalUrls: req.originalUrl,
    },
  });
});

/* ------------------------------------------------------- */
//? StatusCodes

app
  .route("/status-codes")
  .get((req, res) => res.send({ message: "GET" })) // defatul code : 200
  .post((req, res) => res.status(201).send({ method: "POST" })) // post : 201
  .put((req, res) => res.status(202).send({ method: "PUT" })) // put : 202
  .delete((req, res) => res.status(204).send({ method: "DELETE" })); // delete : 204 // NO RESPONE

/* ------------------------------------------------------- */
//? Downland File
app.get("/download", (req, res) => res.download("./express.js"));

//? Redirect
app.get("/redirect-per", (req, res) =>
  res.redirect(301, "https://www.google.com")
); // permanantly
app.get("/redirect-temp", (req, res) =>
  res.redirect(302, "https://www.clarusway.com")
); // temproaryly

/* ------------------------------------------------------- */
//? Express run server
app.listen(PORT, HOST, () =>
  console.log("Running at: http://127.0.0.1:" + PORT)
);
