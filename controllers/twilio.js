module.exports = {
    message: twilling,
}


//sends a TEXT!!!!
function twilling(req, res) {

    // Load the twilio module
    var twilio = require('twilio');

    // Create a new REST API client to make authenticated requests against the
    // twilio back end
    var client = new twilio.RestClient('AC3792565a61c2b3fc07eafd4096169953', 'efa6ca7951bda0d33735c6ddcfb0a700');
    //
    // // Pass in parameters to the REST API using an object literal notation. The
    // // REST client will handle authentication and response serialzation for you.
    client.sms.messages.create({
        to: "+" + 13522754889,
        // req.body.number
        from: '+13526396014',
        body: req.body.message
    }, function(error, message) {
        // The HTTP request to Twilio will run asynchronously. This callback
        // function will be called when a response is received from Twilio
        // The "error" variable will contain error information, if any.
        // If the request was successful, this value will be "falsy"
        if (!error) {
            // The second argument to the callback will contain the information
            // sent back by Twilio for the request. In this case, it is the
            // information about the text messsage you just sent:
            console.log('Success! The SID for this SMS message is:');
            console.log(message.sid);

            console.log('Message sent on:');
            console.log(message.dateCreated);
        } else {
            console.log('Oops! There was an error.');
        }
    });

    res.send('Message Sent');

}

// app.post('/process_post', function(req, res) {
//
//     var delayTime = req.body.timeToSend - Date.now();
//
//
//     //runs the twilling function
//     setTimeout(twilling, 10, req);
//     // Prepare output in JSON format
//     response = {
//         first_name: req.body.first_name,
//         number: req.body.number,
//         message: req.body.message,
//         timeToSend: req.body.timeToSend,
//     };
//     console.log(req.body.message)
//     console.log(response);
//     res.end(JSON.stringify(response)); // check this line out more
// })
