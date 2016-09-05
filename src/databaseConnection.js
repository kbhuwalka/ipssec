'use strict';
var mysql = require("mysql");

var connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
//  password: 'hscie2288',
  database: 'ipssec'
});

connection.connect(function(err){
  if(err){
    console.log(err)
  } else {
    console .log("Connection successful");
  }
});

module.exports.connection = connection;
