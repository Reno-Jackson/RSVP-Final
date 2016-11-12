var express = require('express'),
    morgan = require('morgan'),
    bodyParser = require('body-parser'),
    cookieParser = require('cookie-parser'),
    mongoose = require('mongoose'),
    Routes = require('./routes.js');

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
app.use(express.static('public'));

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
