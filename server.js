/*
var cc       = require('config-multipaas'),
    finalhandler= require('finalhandler'),
    http     = require("http"),
    Router       = require('router'),
    fs = require('fs'),
    serveStatic       = require("serve-static");
*/
var cc = require('config-multipaas');
var finalhandler= require('finalhandler');
var http = require("http");
var serveStatic  = require("serve-static");

var express = require('express');
var ParseDashboard = require('parse-dashboard');
var bodyParser = require('body-parser');
var configParse = {
  "apps": [
    {
      "serverURL": "http://parse-siconv.getup.io/parse",
      "appId": "appId",
      "masterKey": "masterKey",
      "appName": "openshift"
    }
  ],
"trustProxy": 1,
"users": [
{
      "user":"admin",
      "pass":"mba123",
      "masterkey":"masterKey",
      "apps":[{
        "appId":"appId"
        }]
    }
  ]
};

var dashboard = new ParseDashboard(configParse, true);

/*
var config   = cc();
var app      = Router()

// Serve up public/ftp folder 
app.use(serveStatic('static'))
*/

var config   = cc();
var app = express();
app.use(bodyParser.urlencoded({ extended: false }))
 
// parse application/json 
app.use(bodyParser.json())

process.env.SERVER_URL = "http://parse-siconv.getup.io/parse"
process.env.APP_ID = "appId";
process.env.MASTER_KEY = "masterKey";

var ParseRest = require('parse-rest-nodejs').default;

//Autenticacao
app.get('/auth',function(req, res){
  console.log('req==',req.body);
  var parseRest = new ParseRest(req);
  
    parseRest.get('/login', { username:'foo', password:'ba' }, { 'X-Parse-Revocable-Session': 1 }).then((success) => {
    console.log('sucess');
    console.log(success);
  }, (error) => {
    console.log('error==');
    console.error(error);
  });
});

app.get('/leva', function (req, res) {
  var parseRest = new ParseRest(req);
  console.log('leva==');
  parseRest.get('/classes/Programas').then((success) => {
    console.log('sucess');
  console.log(success);
  }, (error) => {
    console.log('error==');
  console.error(error);
  });
  res.send('Hello World!');
});

app.get('/get',function(req, res){
  
});

app.use('/dashboard/', dashboard);

// Serve up public/ftp folder 
app.use(serveStatic('static'))

// Create server 
var server = http.createServer(function(req, res){
  var done = finalhandler(req, res)
  app(req, res, done)
})

server.listen(config.get('PORT'), config.get('IP'), function () {
  console.log( "Listening on " + config.get('IP') + ", port " + config.get('PORT') )
});