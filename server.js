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