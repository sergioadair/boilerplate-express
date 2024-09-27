bodyParser = require('body-parser');
require('dotenv').config();
let express = require('express');
let app = express();

let absolute_path = __dirname + "/views/index.html";


app.use(bodyParser.urlencoded({extended: false}));

app.use(function(req, res, next){
    console.log(req.method + " " + req.path + " - " + req.ip);
    next();
});

app.use("/public", express.static(__dirname + "/public"));

app.get("/", function(req, res){
    res.sendFile(absolute_path);
});

app.get("/json", function(req, res){
    let message = "Hello json";
    if(process.env.MESSAGE_STYLE === "uppercase") message = message.toUpperCase();
    res.json({"message": message});
});

app.get("/now", function(req, res, next){
    req.time = new Date().toString();
    next();
}, function(req, res){
    res.json({time: req.time});
});

app.get("/:word/echo", function(req, res){
    res.json({echo: req.params.word});
});

app.post("/name", function(req, res) { 
    var string = req.body.first + " " + req.body.last;
    res.json({ name: string });
  });





























 module.exports = app;
