'use strict';

var dbConn = require('./databaseConnection.js')
require('./databaseHelper.js');

var express = require("express");
var bodyParser = require("body-parser");
var router = require("./router.js");
var util = require("util");
var locationFinder = require("./locationFinder.js");
//Initialise Express
var app = express();
//Configure express to use body-parser as middleware to handle POST requests
app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
}));

app.post("/", function(request, response){
  console.log("Received POST request");
  console.dir(request.body);
  router.storeData(request.body);

  //End the response
  response.send("Received");
});

app.get("/", function(request, response){
  console.dir(request.query);
  locationFinder.nearestReferencePoint(request.query);
  var data = router.getData(request.query);
  //response.status(data["status"]);

  var jsonString = '{"x":%s,"y":%s}';
  jsonString = util.format(jsonString, Math.random()*1080,  Math.random()*1920);
  response.json(JSON.parse(jsonString));
});

/**
  *Handle all GET requests that have not been defined above.
  *It may be best to not handle any requests as it might make the server
  *more vulnerable to DoS attacks by unecessarily increasing the load.
  */
app.get("*", function(request, response){
  //TODO:Return an error to the user
});

app.listen(3000, function(){
  console.log("The server is running on port 3000. Visit http://localhost:3000");
});
