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
  dbHelper.insertRawData(params);
  // if(validatePostData(params)){
  //
  // } else {
  //   //TODO:Return a JSON response indicating the error
  // }
};

/**
  *Returns a boolean values that indicates
  *whether the data is valid for the database schema or not
  */
function validatePostData(data){
  if(data.bssid && data.rssi && data.referencePointId){
      var isBssidOfProperLength = (data.bssid.length == 17);
      var isRssiNegative = (data.rssi < 0);
      var isReferencePointPositive = (data.referencePointId > 0);

      if(isBssidOfProperLength && isRssiNegative && isReferencePointPositive)
        return true;
  }
  console.log("Incorrect query parameters.");
  return false;
}

/**
  *Retrieve data from the database using databaseHelper
  *based on the parameters provided in the argument
  *and then calculate the location.
  *The function returns a JSON object containing the calculated values.
  */
function getData(data){
  
}

//EXPORTS
module.exports.storeData = storeData;
module.exports.getData = getData;
