let express = require('express');
let dotenv = require('dotenv')
let bodyParser = require('body-parser')
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

// Middleware to handle URL-encoded data
app.use(bodyParser.urlencoded({ extended: false }));

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

// app.route('/name')
//     .get((req, res) => {
//         let firstName = req.query.first;
//         let lastName = req.query.last;
//         res.json({name: `${firstName} ${lastName}`})
//     })
    // .post((req, res) => {
    //     let firstName = req.body.first;
    //     let lastName = req.body.last;
    //     res.json({name: `${firstName} ${lastName}`})
    // });

app.post('/name', (req, res) => {
    let firstName = req.body.first;
    let lastName = req.body.last;
    res.json({name: `${firstName} ${lastName}`})
})

 module.exports = app;