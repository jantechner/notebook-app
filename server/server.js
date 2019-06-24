// const http = require('http');
// const url_parser = require('url')

// const server = http.createServer((request, response) => {

//     // const { url, method, headers } = request;
//     // console.log(url, method, headers)
//     // const parsedUrl = url_parser.parse(url, true);
//     // console.log(parsedUrl)
//     // response.setHeader('content-type', 'text/plain');
//     // response.write(`Your browser: ${headers['user-agent']}\n`);
//     // response.write(`HTTP method: ${method}\n`);
//     // response.write(`id: ${parsedUrl.query.id}`);
//     // response.end();

//     const body = [];

//     request.on('error', (error) => {

//         console.error(error.stack);
//     });

//     request.on('data', (chunk) => {
//         console.log(chunk)
//         body.push(chunk);
//     });

//     request.on('end', () => {
//         const fullBody = Buffer.concat(body).toString();
//         // console.log(fullBody)
//         response.setHeader('content-type', 'text/plain');
//         response.end(`This was posted: ${fullBody}`);
//     });
// });

// server.listen(3000, () => {
//     console.log('Server listening at http://localhost:3000/');
// });

const express = require('express')
const fs = require('fs')
const cors = require('cors')
var bodyParser = require("body-parser")

var notes = require('./routers/notes')
var users = require('./routers/users')

const app = express();
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cors())

app.use('/api/notes', notes)
app.use('/api/users', users)

app.listen(3000, () => {
    console.log('Server running at http://localhost:3000/');
});