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

app.listen(3030, () => {
    console.log('Server running at http://localhost:3030/');
});