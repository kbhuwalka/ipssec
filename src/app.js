'use strict';

var dbConn = require('./databaseConnection.js')
require('./databaseHelper.js');

var express = require("express");
var bodyParser = require("body-parser");
var router = require("./router.js");
//Initialise Express
var app = express();
//Configure express to use body-parser as middleware to handle POST requests

app.get("/store", function(request, response){
  router.storeData(request.query);
  //End the response
  response.send("Received");
});

app.get("/retrieve", function(request, response){
  var data = router.getData(request.query);
  //response.status(data["status"]);
  response.json(data);
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
