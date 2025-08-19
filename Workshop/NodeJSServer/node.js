'use strict'

//!--------------------NODEJS_SERVER--------/


/*---------------------------------------------*

//? HTTP SERVER:

const http = require('node:http');

const app = http.createServer((request, response)=>{
    response.end('My First NodeJS Server')
    console.log('First server console');

});

app.listen(8000, 'localhost', ()=>
    console.log('First Server: http://localhost:8000')
);




/*---------------------------------------------*
const http = require('node:http');

const app = http.createServer((req, res)=>{
    if(req.url == '/'){
        res.end('You are inception page')
    } else if (req.url == '/second'){
        res.end('You are second page')
    } else{
        res.end('You are amazing')
    }

});

app.listen(8000, 'localhost', ()=>
    console.log('Second Server: http://localhost:8000')
);


/*---------------------------------------------*/

const http = require('node:http');

const app = http.createServer((req, res)=>{
    if(req.url == '/'){
        res.end('You are enter page')
    } else if (req.url == '/third'){
        res.end('You are third page')
    } else{
        res.end('You are succesful page')
    }

}).listen(8000, 'localhost', ()=>
    console.log('Third Server: http://localhost:8000')
);
/*---------------------------------------------*
I am very happy:)

/*---------------------------------------------*/
/*---------------------------------------------*/