var Itinerary = require('../models/yelp.Model'); // db.heroes

function create(req, res) {

    var newDoc = new Itinerary(req.body);

    newDoc.save((err, doc) => {
        if (err) {
            return res.send(err);
        }
        res.send(doc);
    });
}

function get(req, res) {
    // get One
    if (req.params.id) {
        Itinerary.findOne({
            _id: req.params.id
        }, (err, document) => {
            if (err) {
                // if(err.name === "CastError" && err.kind === "ObjectId"){
                //     return res.send(`That ain't no ID`)
                // }

                return res.send(err);
            }
            if (!document) {
                return res.send('No one with that id')
            }
            res.send(document);
        });
    }
    // get Many
    else {
        Itinerary.find({}, (err, documents) => {
            // res.send(err || documents)
            if (err) {
                return res.send(err);
            }
            res.send(documents);
        });
    }
}

module.exports = {
    create: create,
    get: get,
}
