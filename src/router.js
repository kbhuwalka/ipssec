'use strict';

var dbHelper = require("./databaseHelper.js");
var locationFinder = require("./locationFinder.js");

/**
  *Checks the data sent by the POST request for errors
  *and persists the data to the database.
  *The function returns a JSON object for the response.
  */
function storeData(params){
  console.log("Received a POST request from a client.");
  if(validatePostData(params)){
    dbHelper.insert(params);
  } else {
    //TODO:Return a JSON response indicating the error
  }
};

/**
  *Returns a boolean values that indicates
  *whether the data is valid for the database schema or not
  */
function validatePostData(data){
  return false;
}

/**
  *Retrieve data from the database using databaseHelper
  *based on the parameters provided in the argument
  *and then calculate the location.
  *The function returns a JSON object containing the calculated values.
  */
function getData(params){
  var rawValues = dbHelper.read(params);
  var calculatedValues = locationFinder.calculate(rawValues);

  return calculatedValues;
}

//EXPORTS
module.exports.storeData = storeData;
module.exports.getData = getData;
