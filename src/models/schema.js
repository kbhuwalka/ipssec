'use strict';

var mongoose = require('mongoose');

var signalSchema = new mongoose.Schema({
  referencePointId: {type: Number, unique: true, required: true},
  referenceX: Number,
  referenceY: Number,
  signals:  [
    {
      //BSSID is always exactly 17 characters long
      bssid:  {
        type: String,
        unique: true,
        required: true,
        maxlength: 17,
        minlength: 17},
      rssi: [{
        //RSSI values are always negative and unique for every time instance
        value: {
          type: Number,
          unique:true,
          required: true,
          max: -1},
        time: { type: Date, default: Date.now}
      }],
      rssiAverage: Number
    }
  ]
});

var model = mongoose.model('Signals', signalSchema);

module.exports = model;
