'use strict';

//MongoDb middleware
var mongoose = require('mongoose');
var Signals = require('./models/schema.js');

mongoose.connect('mongodb://localhost/ips', function(error){
  if(error){
    console.log("Failed to connect to the MongoDb database.");
  } else {
    console.log("Successfuly established connection to the database.");
  }
});

/**
  *Read the objects from the database based on the
  *filters that are provided as arguments and
  *return the objects that match the filters.
  */
function read(filters){

}
