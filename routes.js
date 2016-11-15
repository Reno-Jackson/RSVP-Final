var Auth = require('./controllers/auth');


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

    // Login Routes/////////////////////////////////////////////////////////////////

    app.get('/login', Auth.render); // route for the login page
    app.get('/logout', Auth.logout); // route for logging out

    app.post('/login', Auth.login); // form request emdpoint for loggin in
    app.post('/register', Auth.register); // form request endpoint for user registration



}
