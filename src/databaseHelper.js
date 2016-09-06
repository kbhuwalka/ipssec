'use strict';

var db = require('./databaseConnection.js');
var util = require('util');

//The data cache which is set up through the init method
var rawDataJsonObjects = [];
var rawDataReferenceIds = [];

/**
  *This function caches the raw_data table onto the server
  *CAUTION: Potential a very process-intensive task
  */
function initRawData(){
  //Currently this acts as a convinience function allowing future modifications
  readRawData();
}

/**
  *Read the objects from the database based on the
  *filters that are provided as arguments and
  *return the objects that match the filters.
  */
function read(query){
  var data = [];
  db.connection.query(query)
    .on("error", function(err){
      console.log("Couldn't read data.");
      console.error(err);
    })
    .on("result", function(row){
      data.push(row);
    });
    return data;
}

/**
  *This function reads the IDs of all the references points
  *present in the database and returns an Array of the IDs.
  */
function readAllReferencePoints(){
  var readQuery = "SELECT DISTINCT referenceId FROM dirtydata";
  var result = read(readQuery);
    //TODO: Parse the result and return an array
    console.dir(result);
}

/**
  *This function reads all the BSSIDs in the database
  *and returns an array
  */
function readAllBssids(){
    var readQuery = "SELECT DISTINCT bssid FROM dirtydata";
    var result = read(readQuery);
      //TODO: Parse the result and return an array
      console.dir(result);
}

  /**
    *This function returns an array of reference point IDs
    *for a given BSSIDs after reading from the database
    */
function readReferencePointsForBssid(bssid){
  var readQuery = "SELECT DISTINCT referenceId FROM dirtydata WHERE bssid = %s";
  readQuery = util.format(readQuery, bssid);

  var result = read(readQuery);
  //TODO: Parse the result and return an array
  console.dir(result);
}

/**
  *This function returns an array of RSSI values
  *for a given BSSID and a reference point ID from the database
  */
  function readRssiForBssidAndReferencePoint(bssid, referenceId){
    var readQuery = "SELECT rssi FROM dirtydata WHERE bssid = %s AND referenceId = %s";
    readQuery = util.format(readQuery, bssid, referenceId);

    var result = read(readQuery);
    //TODO: Parse the result and return an array
    console.dir(result);
  }

  /**
    *This function returns the average RSSI value
    *for a particular BSSID and a reference point
    *from the database
    */
function readAverageRssiForBssidAndReferencePoint(bssid, referenceId){
  var readQuery = "SELECT AVG(rssi) FROM dirtydata WHERE bssid = %s AND referenceId = %s";
  readQuery = util.format(readQuery, bssid, referenceId);

  var result = read(readQuery);
  //TODO: Parse the result and return an array
  console.dir(result);
}

/**
  *This function retrieves raw data from the database
  *and creates an array  which is cached as variables in global scope
  *CAUTION: This function reads the entire database into the server.
  */
function readRawData(){
  var readQuery = "SELECT referenceId, data FROM raw_data";

  var result = read(readQuery);
  console.dir(result);

  result.forEach(function(row){
      rawDataJsonObjects.push(JSON.parse(row.data));
      rawDataReferenceIds.push(row.referenceId);
  });
}

/**
  *Store the objects into the database.
  *The function first checks if a reference point with the given Id exists
  *and updates the values for the particular BSSID, otherwise
  *it inserts a new object.
  */
function insert(signal){
  var insertQuery = "INSERT INTO `dirtydata` (`referenecId`,`bssid`, `rssi`, `time`) VALUES (%s,'%s', %s, CURRENT_TIMESTAMP)";

  var referenceId = signal.referencePointId;
  var bssid = signal.bssid;
  var rssi = signal.rssi;

  insertQuery = util.format(insertQuery, referenceId, bssid, rssi);

  db.connection.query( insertQuery, function(err, rows){
      if(err)
        console.log(err);
      else
        console.dir(rows);
    }
  );
}

/**
  *This function inserts raw data
  *into the database without parsing anything
  */
function insertRawData(data){
  var insertQuery = "INSERT INTO `raw_data` (`referenecId`, `data`, `time`) VALUES (%s,'%s', CURRENT_TIMESTAMP)";

  var referenecId = data.referenecId;
  var jsonString = data.data;

  insertQuery = util.format(insertQuery, referenecId, jsonString);

  db.connection.query(insertQuery, function(err, result){
    if(err){
      console.log("Couldn't insert rows into raw_data Table.");
      console.error(err);
    } else {
      console.log("Successfully inserted data into raw_data Table.");
    }
  });

}



module.exports.read = readAllReferencePoints;
module.exports.insert = insert;

//Exports for raw data
module.exports.init = init;
module.exports.rawDataJsonObjects = rawDataJsonObjects;
module.exports.rawDataReferenceIds = rawDataReferenceIds;
