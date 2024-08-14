let express = require('express');
let dotenv = require('dotenv')
dotenv.config();
let app = express();

console.log("Hello World")

const absolutePath = __dirname + '/views/index.html'
const publicFolder = __dirname + '/public'

app.use("/public", express.static(publicFolder))

// logger middleware
app.use((req, res, next) => {
    const logMessage = `${req.method} ${req.path} - ${req.ip}`
    console.log(logMessage)
    next();
})

app.get('/', function(req, res){
    res.sendFile(absolutePath)
})

app.get('/json', (req, res) => {
    const messageStyle = process.env.MESSAGE_STYLE
    let message = "Hello json"

    if (messageStyle === "uppercase"){
        message = message.toUpperCase();
    }
    res.json({message})
})

app.get('/now', (req,res, next) => {
    req.time = new Date().toString()
    next();
}, function(req, res){
    res.json({"time": req.time})
})

app.get('/:word/echo', function(req, res){
    let word = req.params.word;
    res.json({echo: word});
});

 module.exports = app;