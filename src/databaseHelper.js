'use strict';

var db = require('./databaseConnection.js');

/**
  *Read the objects from the database based on the
  *filters that are provided as arguments and
  *return the objects that match the filters.
  */
function read(filters){
  if("bssid" in filters){

  }
}

/**
  *Store the objects into the database.
  *The function first checks if a reference point with the given Id exists
  *and updates the values for the particular BSSID, otherwise
  *it inserts a new object.
  */

function insert(signal){
  db.connection.query(
    "SELECT * FROM referencepoint",
    function(err, rows, fields){
      if(err)
        console.log("Didn't read anything...");
      else {
        console.log("Read %s rows...", rows.lenght);
        }
    }
  );

}



module.exports.read = read;
module.exports.insert = insert;
