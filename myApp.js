let express = require('express');
let app = express();

console.log("Hello World")

app.get('/', function(res, req){
    res.send('Hello Express')
})































 module.exports = app;
