var db = require('../config.js');
var mongoose = require('mongoose');

var eventsSchema = new mongoose.Schema({
  name: {type: String, lowercase: true},
  start: Date,
  created: Date,
  updated: Date,
  artists: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Artists', unique: true}],
  score: Number,
  location: {
    type: {
      type: 'String',
      required: true,
      enum: ['Point', 'LineString', 'Polygon'],
      default: 'Point'
    },
    coordinates: [Number]
  },
  venue: {type: String, lowercase: true},
  city: {type: String, lowercase: true},
  state: {type: String, lowercase: true},
  sgticketsurl: String,
  sgscore: Number,
  venueScore: Number,
  watsonScore: Object,
  instances: Number
  // venue: {
  //   name: String,
  //   score: Number
  // },
});



var Events = mongoose.model('Events', eventsSchema);
Events.collection.ensureIndex({'location': '2dsphere'}, function(err, res) {
  if (err) {
    return console.log('error');
  } else {
    console.log('ensureIndex successful', res);
  }
});
module.exports = Events;
