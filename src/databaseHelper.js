'use strict';

var db = require('./databaseConnection.js');
var util = require('util');


/**
  *Read the objects from the database based on the
  *filters that are provided as arguments and
  *return the objects that match the filters.
  */
function read(query){
  db.connection.query( query, function(err, result){
    if(err){
      console.log("Could not read data");
      console.log(err);
    } else{
      return result;
    }
  }
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
  });
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
    });
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



module.exports.read = readAllReferencePoints;
module.exports.insert = insert;
