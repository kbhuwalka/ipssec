'use strict';

var mongoose = require('mongoose');

var signalSchema = new mongoose.Schema({
  referencePointId: Number,
  signals:  [
    {
      bssid:  String,
      rssi: [{
        value: Number,
        time: { type: Date, default: Date.now}
      }]
    }
  ]
});

var model = mongoose.model('Signals', signalSchema);

module.exports = model;
