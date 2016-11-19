///////////////////////////////////////////////////////////////////////////
// Small Calendar Widget Code /////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////

// angular.module('ui.bootstrap.demo').controller('DatepickerPopupDemoCtrl', function(yelp) {
//     yelp.today = function() {
//         yelp.dt = new Date();
//     };
//     yelp.today();
//
//     yelp.clear = function() {
//         yelp.dt = null;
//     };
//
//     yelp.inlineOptions = {
//         customClass: getDayClass,
//         minDate: new Date(),
//         showWeeks: true
//     };
//
//     yelp.dateOptions = {
//         dateDisabled: disabled,
//         formatYear: 'yy',
//         maxDate: new Date(2020, 5, 22),
//         minDate: new Date(),
//         startingDay: 1
//     };
//
//     // Disable weekend selection
//     function disabled(data) {
//         var date = data.date,
//             mode = data.mode;
//         return mode === 'day' && (date.getDay() === 0 || date.getDay() === 6);
//     }
//
//     yelp.toggleMin = function() {
//         yelp.inlineOptions.minDate = yelp.inlineOptions.minDate ? null : new Date();
//         yelp.dateOptions.minDate = yelp.inlineOptions.minDate;
//     };
//
//     yelp.toggleMin();
//
//     yelp.open1 = function() {
//         yelp.popup1.opened = true;
//     };
//
//     yelp.open2 = function() {
//         yelp.popup2.opened = true;
//     };
//
//     yelp.setDate = function(year, month, day) {
//         yelp.dt = new Date(year, month, day);
//     };
//
//     yelp.formats = ['dd-MMMM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];
//     yelp.format = yelp.formats[0];
//     yelp.altInputFormats = ['M!/d!/yyyy'];
//
//     yelp.popup1 = {
//         opened: false
//     };
//
//     yelp.popup2 = {
//         opened: false
//     };
//
//     var tomorrow = new Date();
//     tomorrow.setDate(tomorrow.getDate() + 1);
//     var afterTomorrow = new Date();
//     afterTomorrow.setDate(tomorrow.getDate() + 1);
//     yelp.events = [{
//         date: tomorrow,
//         status: 'full'
//     }, {
//         date: afterTomorrow,
//         status: 'partially'
//     }];
//
//     function getDayClass(data) {
//         var date = data.date,
//             mode = data.mode;
//         if (mode === 'day') {
//             var dayToCheck = new Date(date).setHours(0, 0, 0, 0);
//
//             for (var i = 0; i < yelp.events.length; i++) {
//                 var currentDay = new Date(yelp.events[i].date).setHours(0, 0, 0, 0);
//
//                 if (dayToCheck === currentDay) {
//                     return yelp.events[i].status;
//                 }
//             }
//         }
//
//         return '';
//     }
// });

/////////////////////////////////////////////////////////////////////////
//End of Calendar Widget Fuctionality////////////////////////////////////
/////////////////////////////////////////////////////////////////////////



/////////////////////////////////////////////////////////////////////////
// Angular JS work fpr App///////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////

angular.module('RSVP', ['ngRoute', 'ui.bootstrap'])
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
}

function yelpController($http, $routeProvider) {
    var yelp = this;
    yelp.foo = 'foo'
    window.yelp = yelp;





    yelp.doStuff = function() {
        console.log('doin stuff')
    }

    yelp.today = function() {
        yelp.dt = new Date();
    };
    yelp.today();

    yelp.clear = function() {
        yelp.dt = null;
    };

    yelp.inlineOptions = {
        customClass: getDayClass,
        minDate: new Date(),
        showWeeks: true
    };

    yelp.dateOptions = {
        dateDisabled: disabled,
        formatYear: 'yy',
        maxDate: new Date(2020, 5, 22),
        minDate: new Date(),
        startingDay: 1
    };

    // Disable weekend selection
    function disabled(data) {
        var date = data.date,
            mode = data.mode;
        return mode === 'day' && (date.getDay() === 0 || date.getDay() === 6);
    }

    yelp.toggleMin = function() {
        yelp.inlineOptions.minDate = yelp.inlineOptions.minDate ? null : new Date();
        yelp.dateOptions.minDate = yelp.inlineOptions.minDate;
    };

    yelp.toggleMin();

    yelp.open1 = function() {
        yelp.popup1.opened = true;
    };

    yelp.open2 = function() {
        yelp.popup2.opened = true;
    };

    yelp.setDate = function(year, month, day) {
        yelp.dt = new Date(year, month, day);
    };

    yelp.formats = ['dd-MMMM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];
    yelp.format = yelp.formats[0];
    yelp.altInputFormats = ['M!/d!/yyyy'];

    yelp.popup1 = {
        opened: false
    };

    yelp.popup2 = {
        opened: false
    };

    var tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    var afterTomorrow = new Date();
    afterTomorrow.setDate(tomorrow.getDate() + 1);
    yelp.events = [{
        date: tomorrow,
        status: 'full'
    }, {
        date: afterTomorrow,
        status: 'partially'
    }];

    function getDayClass(data) {
        var date = data.date,
            mode = data.mode;
        if (mode === 'day') {
            var dayToCheck = new Date(date).setHours(0, 0, 0, 0);

            for (var i = 0; i < yelp.events.length; i++) {
                var currentDay = new Date(yelp.events[i].date).setHours(0, 0, 0, 0);

                if (dayToCheck === currentDay) {
                    return yelp.events[i].status;
                }
            }
        }

        return '';
    }









    yelp.events = [];
    window.yelp = yelp;
    // yelp.activeButton = true;
    yelp.activeButton = {
        'restaurants': false,
        'nightlife': false,
        'amusementparks': false,
        'arts': false,
        'hiking': false
    }

    yelp.categories = ['restaurants', 'nightlife', 'amusementparks', 'arts', 'hiking'];


    yelp.testApi = function() {

            // console.log("test api firing");

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
        // yelp.toggleButton = function() {
        //     console.log("Why you Click Button?");
        //     yelp.activeButton = !yelp.activeButton;
        // }


    yelp.changeCategory = function(category) {
        console.log("Setting category to ", category);
        yelp.category = category;


    }

    yelp.addEvent = function(name, address, img_url) {
        // console.log("image", img_url)
        var eventExists = false;
        var event = {
            name: name,
            address: address,
            img: img_url,
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
    yelp.SaveData = function() {
        window.location.href = '/html/text.html'
        var newItinerary = {
            events: yelp.events,
            date: yelp.dt
        }
        $http.post('/api/RSVP/Itinerary', newItinerary)
            .then(function(success) {
                console.log(success)
            }, function(err) {
                console.log(err)
            })
    }
    yelp.getProfile = function() {
        $http.get('/api/me')
            .then(function(success) {
                console.log(success)
                yelp.profile = success.data;
            }, function(err) {
                console.log(err)
            })
    }
    yelp.getPastEvents = function() {
        $http.get('/api/RSVP/Itinerary')
            .then(function(success) {
                console.log("Response: ", success)
                yelp.pastEvents = success.data;
            }, function(err) {
                console.log(err)
            })
    }

    yelp.sendMessage = function() {
        console.log("Attempting to send message!");

        $http.post('http://textbelt.com/text', {

                number: yelp.getNumber,
                message: "To " + yelp.getName + ":" + yelp.getMessage
            })
            .then(function(success) {
                console.log("Response: ", success)
            }, function(err) {
                console.log(err)
            })
    }


    ////////////////////////////////////////////////////////////////////////////
    //End of Angular JS work for YelpApp////////////////////////////////////////
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
