/////////////////////////////////////////////////////////////////////////
// Angular JS work fpr App///////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////

angular.module('RSVP', ['ngRoute'])
    .controller('YelpCtrl', yelpController)
    .config(myRouter);

yelpController.$inject = ['$http'];

myRouter.$inject = ['$routeProvider'];

function myRouter($routeProvider) {

    $routeProvider
        .when('/', {
            templateUrl: '/html/templates/app.html'
        })
        .otherwise({
            redirectTo: '/'
        })
        .when('/app', {
            templateUrl: '/html/index.html'
        })
        .otherwise({
            redirectTo: '/'
        })
        .when('/', {
            templateUrl: ''
        })
        .otherwise({
            redirectTo: ''
        })
}

function yelpController($http, $routeProvider) {
    var yelp = this;

    yelp.events = [];

    window.yelp = yelp;
    yelp.categories = ['restaurants', 'nightlife', 'amusementparks', 'arts', 'hiking'];

    console.log("TEST");

    yelp.testApi = function() {

        console.log("test api firing");

        var callbackID = angular.callbacks.$$counter.toString(36);
        var method = 'GET';
        var url = 'http://api.yelp.com/v2/search';
        var consumerSecret = '8vFRzEqfWIfG_QRo1j0bVWC8ZAU'; //Consumer Secret
        var tokenSecret = 'TJmo_sm5MKq-8nCFQn1GRz0KgFo'; //Token Secret
        var params = {
            callback: 'angular.callbacks._' + callbackID,
            location: yelp.location,
            oauth_consumer_key: 'BWZzJtUM_43u0qB0jnHEIQ', //Consumer Key
            oauth_token: 'IlUVH4PVhpUXWewmanoDr_SJBcmSf_zn', //Token
            oauth_signature_method: "HMAC-SHA1",
            oauth_timestamp: new Date().getTime(),
            oauth_nonce: randomString(32, '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'),
            term: yelp.term,
            category_filter: yelp.category
        };
        var signature = oauthSignature.generate(method, url, params, consumerSecret, tokenSecret, {
            encodeSignature: false
        });
        params['oauth_signature'] = signature;
        console.log(signature);

        $http.jsonp(url, {
            params: params
        }).then(function successCallback(response) {
            yelp.data = response.data;
            console.log("Success: ", response);
        }, function errorCallback(response) {
            console.log("Error: ", response);
        });
    }
    yelp.changeCat = function(category) {
        console.log("Setting category to ", category);
        yelp.category = category;
    }

    yelp.addEvent = function(name, address) {
        var eventExists = false;
        var event = {
            name: name,
            address: address
        };
        for (var i = 0; i < yelp.events.length; i++) {
            if (yelp.events[i].name === name) {
                eventExists = true;
            }
        }
        if (yelp.events.length < 5 && !eventExists) {
            yelp.events.push(event)
        }

    }
    yelp.removeEvent = function(name) {
        for (var i = 0; i < yelp.events.length; i++) {
            if (yelp.events[i].name === name) {
                yelp.events.splice(i, 1);
            }
        }
    }


    ////////////////////////////////////////////////////////////////////////////
    //End of Angular JS work for App////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////////////////


    //////////////////////////////////////////////////////////////////////////
    // Beginning Scroll to Top Area for App///////////////////////////////////
    //////////////////////////////////////////////////////////////////////////

    // ===== Scroll to Top ====

    $(window).scroll(function() {
        if ($(this).scrollTop() >= 50) { // If page is scrolled more than 50px
            $('#return-to-top').fadeIn(200); // Fade in the arrow
        } else {
            $('#return-to-top').fadeOut(200); // Else fade out the arrow
        }
    });
    $('#return-to-top').click(function() { // When arrow is clicked
        $('body,html').animate({
            scrollTop: 0 // Scroll to top of body
        }, 500);
    });

    //////////////////////////////////////////////////////////////////////////
    // End Scroll to Top Area for App/////////////////////////////////////////
    /////////////////////////////////////////////////////////////////////////
}

function randomString(length, chars) {
    var result = '';
    for (var i = length; i > 0; --i) result += chars[Math.round(Math.random() * (chars.length - 1))];
    return result;
}
