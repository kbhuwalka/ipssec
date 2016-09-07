'use strict';

var dbHelper = require("./databaseHelper.js");
var machineLearning = require("machine_learning");

var threshhold = -100;

/**
  *This function uses K-Nearest Neighbour Algorithm
  *to determine the closest reference point for the given location
  */
function nearestReferencePoint(location){

  var referencePoints = dbHelper.readAllReferencePoints();
  var bssids = dbHelper.readAllBssids();

  var data = [];
  referencePoints.forEach(function(point){
    var rssi = [];
    bssids.forEach(function(bssid){
      rssi.push(dbHelper.readAverageRssiForBssidAndReferencePoint(bssid, point));
    });
    data.push(rssi);
  });

  var model = new machineLearning.KNN({
    data: data,
    result: referencePoints
  });

  var prediction = model.predict({
    x:createLocationRssiArray(location),
    k: 3,
    weightf : {type : 'gaussian', sigma : 10.0},
    distance : {type : 'euclidean'}
  });

  console.log("Nearest Reference Point: "+ prediction);

}

/**
  *This function creates an array of RSSI values
  *from the request query for each BSSID
  */
function createLocationRssiArray(location){
  var obj = JSON.parse(location.data);
  var bssids = dbHelper.readAllBssids();
  var locationArray = [];
  bssids.forEach(function(bssid){
    locationArray.push(0);
  });
  obj.forEach(function(object){
    locationArray[bssids.indexOf(object.BSSID)] = object.level;
  });

  console.dir(locationArray);

  return locationArray;
}

function locate(data) {
    var deviation = new Array(dbHelper.rawDataLength);
    var hits = new Array(dbHelper.rawDataLength);
    for (var set = 0; set != dbHelper.rawDataLength; ++set) {
        hits[set] = 0;
        deviation[set] = 0;
        for (var dataIndex = 0; dataIndex != data.length; ++dataIndex) {
            for (var setIndex = 0; setIndex != dbHelper.rawDataJsonObjects[set]; ++setIndex) {
                if (!data[dataIndex].BSSID.equals(dbHelper.rawDataJsonObjects[setIndex].BSSID)) continue;
                if ((data[dataIndex].level < threshhold) || (dbHelper.rawDataJsonObjects[setIndex].level < threshhold)) continue;
                ++hits[set];
                deviation[set] += Math.abs(data[dataIndex].level - dbHelper.rawDataJsonObjects[setIndex].level);
                break;
            }
        }
    }

    //*Find the set with least mean deviation.

    var leastDeviatedSet = 0;
    var leastDeviation = deviation[0] / hits[0];

    for (var set = 0; set != dbHelper.rawDataLength; ++set) {

        var meanDeviation = deviation[set] / hits[set];
        if (meanDeviation > leastDeviation) continue;
        leastDeviation = meanDeviation;
        leastDeviatedSet = set;
    }
    console.log("Nearest Reference Point: " + dbHelper.rawDataReferenceIds[leastDeviatedSet]);
}

module.exports.nearestReferencePoint = nearestReferencePoint;
