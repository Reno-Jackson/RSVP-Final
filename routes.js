var Auth = require('./controllers/auth');
var twilio = require('./controllers/twilio');
var profile = require('./controllers/profile')

module.exports = (app) => {

    app.get('/', (req, res) => {
        res.sendFile('index.html', {
            root: './public/html/'
        })
    })

    app.get('/app', (req, res) => {
        res.sendFile('app.html', {
            root: './public/html/'
        })
    })
    app.get('/itinerary/:id', (req, res) => {
        res.sendFile('itinerary.html', {
            root: './public/html/'
        })
    })


    app.get('/api/me', profile.getMe)
    app.get('/api/RSVP/Itinerary', profile.getItinerary)
    app.get('/api/RSVP/Itinerary/:id', profile.getItineraryId)

    app.post('/twilio', twilio.message)
    app.post('/api/RSVP/Itinerary', profile.saveItinerary)


    // Login Routes/////////////////////////////////////////////////////////////////

    app.get('/login', Auth.render); // route for the login page
    app.get('/logout', Auth.logout); // route for logging out

    app.post('/login', Auth.login); // form request emdpoint for loggin in
    app.post('/register', Auth.register); // form request endpoint for user registration



}
