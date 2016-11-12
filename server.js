var express = require('express'),
    morgan = require('morgan'),
    bodyParser = require('body-parser'),
    cookieParser = require('cookie-parser'),
    mongoose = require('mongoose'),
    fileserver = express.static('public'), // turn the public folder into a file server
    Routes = require('./routes.js'),
    colors = require('colors'),
    sessions = require('client-sessions')({ // session cookie
        cookieName: 'RSVP', // cookie name (within document.cookies on the Frontend)
        secret: 'My$uP3R@W3$0M3$3CR3+', // encryption secret
        requestKey: 'session', // stores the session cookie in req.session
        duration: (86400 * 1000) * 7, // one week in milliseconds
        cookie: {
            ephemeral: false, // when true, cookie expires when the browser closes
            httpOnly: true, // when true, cookie is not accessible from javascript
            secure: false // when true, cookie will only be sent over SSL;
        }
    });


mongoose.connect('mongodb://localhost/rsvp', (err) => {
    if (err) {
        console.log('Yo, Could not connect!', err);
        process.exit(1);
    } else {
        console.log('We are Connected!')
    }
})

var PORT = process.env.PORT || 3030;

var app = express();

// Middleware goes here//
app.use(fileserver);

app.use(sessions);

app.use(morgan('dev'));

app.use(bodyParser.json());

app.use(bodyParser.json(), bodyParser.urlencoded({
    extended: true
}));

// Routes//
Routes(app);

app.listen(3030, (error) => {
    if (error) {
        console.log('Error: ', error);
        process.exit(1);
    } else {
        console.log('Server is up for RSVP!');
    }
});
