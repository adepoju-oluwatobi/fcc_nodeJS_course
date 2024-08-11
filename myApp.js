let express = require('express');
let app = express();

console.log("Hello World")

const absolutePath = __dirname + '/views/index.html'
const publicFolder = __dirname + '/public'

app.get('/', function(req, res){
    res.sendFile(absolutePath)
})
app.use("/public", express.static(publicFolder))































 module.exports = app;
