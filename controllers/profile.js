var yelp = require('../models/yelp.Model.js')
var User = require('../models/user.js')

function saveItinerary(req, res) {
    var newItinerary = new yelp(req.body);
    newItinerary.userId = req.session.uid;
    newItinerary.save((err, document) => {
        if (err) {
            console.log('Error saving to database', err);
            res.send(err)
        } else {
            console.log('Sucess, saved to database', document);
            res.send(document)
        }
    })
}

function getMe(req, res) {
    User.findOne({
        _id: req.session.uid
    }, (err, user) => {
        if (err) {
            console.log('Error getting Profile from database', err);
            res.send(err)
        } else {
            console.log('Sucess, Viewed profile from database', user);
            res.send(user)
        }
    })
}

function getItinerary(req, res) {
    yelp.findOne({
        userId: req.session.uid
    }, (err, itineraries) => {
        if (err) {
            console.log('Error getting Itineraries from database', err);
            res.send(err)
        } else {
            console.log('Sucess, View Itineraries from database', itineraries);
            res.send(itineraries.events)
        }
    })
}

module.exports = {
    saveItinerary: saveItinerary,
    getItinerary: getItinerary,
    getMe: getMe
}
