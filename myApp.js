let express = require('express');
let dotenv = require('dotenv')
let app = express();

dotenv.config();
console.log("Hello World")

const absolutePath = __dirname + '/views/index.html'
const publicFolder = __dirname + '/public'

app.get('/', function(req, res){
    res.sendFile(absolutePath)
})
app.use("/public", express.static(publicFolder))

app.get('/json', function(req, res){
    const messageStyle = process.env.MESSAGE_STYLE
    let message = "Hello json"

    if (messageStyle === "uppercase"){
        message = message.toUpperCase()
    }
    res.json({message})
})





























 module.exports = app;
