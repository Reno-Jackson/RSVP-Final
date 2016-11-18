var mongoose = require('mongoose');

var itinerarySchema = mongoose.Schema({
    events: {
        type: Array
    },
    userId: {
        type: mongoose.Schema.ObjectId,
        ref: 'User'
    },
    date: {
        type: Date
    }
});

module.exports = mongoose.model('Itinerary', itinerarySchema, 'itineraries');
