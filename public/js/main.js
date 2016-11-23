/////////////////////////////////////////////////////////////////////////
// Angular JS work fpr App///////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////

angular.module('RSVP', ['ngRoute', 'ui.bootstrap'])
    .controller('YelpCtrl', yelpController)
    .config(myRouter);

yelpController.$inject = ['$http', '$routeParams', '$location'];

myRouter.$inject = ['$routeProvider'];

function myRouter($routeProvider) {

    $routeProvider
        .when('/', {
            templateUrl: '/html/templates/app.html'
        })
        .when('/app', {
            templateUrl: '/html/index.html'
        })
        .otherwise({
            redirectTo: '/'
        })
}

function yelpController($http, $routeProvider, $routeParams, $location) {
    var yelp = this;
    window.yelp = yelp;

    //////////////////////////////////////////////////////
    ///////Functions for Calendar widget//////////////////
    //////////////////////////////////////////////////////
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
    //////////////////////////////////////////////////////
    // Yelp Functions/////////////////////////////////////
    //////////////////////////////////////////////////////

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
        yelp.initMap();

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
            yelp.getLocationTemp(yelp.location);
            console.log("Success: ", response);
        }, function errorCallback(response) {
            console.log("Error: ", response);
        });
    }


    yelp.changeCategory = function(category) {
        console.log("Setting category to ", category);
        yelp.category = category;


    }

    yelp.addEvent = function(name, address, img_url, lat, lng) {
        var eventExists = false;
        var event = {
            name: name,
            address: address,
            img: img_url,
            lat: lat,
            lng: lng
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
                yelp.itineraryId = success.data._id;
                localStorage.setItem('itineraryId', yelp.itineraryId);
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
    yelp.getItinerary = function() {

        var id = window.location.pathname.split('/')[2];
        console.log("Getting itinerary with id: ", id);

        if (id) {

            $http.get('/api/RSVP/Itinerary/' + id)
                .then(function(success) {
                    console.log("Response: ", success)
                    yelp.itinerary = success.data;
                }, function(err) {
                    console.log(err)
                })
        }

    }

    yelp.sendMessage = function() {
        var itineraryId = localStorage.getItem("itineraryId");
        var message = `Hey ${yelp.getName}, this is  ${yelp.getUser}. ${yelp.getMessage}.
            \ See your RSVP here: http://rsvpnow.events/itinerary/${itineraryId}`

        console.log("Attempting to send message!");
        console.log("Message: ", message);

        $http.post('http://textbelt.com/text', {

                number: yelp.getNumber,
                message: message
            })
            .then(function(success) {
                console.log("Response: ", success)
            }, function(err) {
                console.log(err)
            })
    }

    yelp.getLocationTemp = function() {
        $http.get(`http://api.openweathermap.org/data/2.5/weather?q=${yelp.location}&units=imperial&appid=4d53313ed2eb58bd33897a7696b050bf`)
            .then(function(res) {
                console.log("Response: ", res.data);
                yelp.temp = res.data.main.temp;
                yelp.temp = yelp.temp.toFixed(0);
                yelp.currentCity = res.data.name;
                yelp.currentCountry = res.data.sys.country;
                yelp.currentCondition = res.data.weather[0].description.toUpperCase();
                yelp.weatherIcon = `http://openweathermap.org/img/w/${res.data.weather[0].icon}.png`;
            }, function(err) {
                console.log(err);
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
    yelp.initMap = function() {
        var directionsService = new google.maps.DirectionsService;
        var directionsDisplay = new google.maps.DirectionsRenderer;
        var geocoder = new google.maps.Geocoder;

        geocoder.geocode({
            'address': yelp.location
        }, function(results, status) {
            if (status == google.maps.GeocoderStatus.OK) {
                console.log("Got result: ", results);
                yelp.locationCoords = {
                    lat: results[0].geometry.location.lat(),
                    lng: results[0].geometry.location.lng()
                };

                var map = new google.maps.Map(document.getElementById('map'), {
                    zoom: 6,
                    center: yelp.locationCoords
                });
                directionsDisplay.setMap(map);

                document.getElementById('submit').addEventListener('click', function() {
                    yelp.calculateAndDisplayRoute(directionsService, directionsDisplay);
                });
            }
        })
    }

    yelp.calculateAndDisplayRoute = function(directionsService, directionsDisplay) {
        yelp.waypoints = [];

        yelp.origin = {
            lat: yelp.events[0].lat,
            lng: yelp.events[0].lng
        };

        if (yelp.events.length === 1) {
            yelp.destination = {
                lat: yelp.events[0].lat,
                lng: yelp.events[0].lng
            };
            yelp.waypoints = [];
        } else if (yelp.events.length === 2) {
            yelp.destination = {
                lat: yelp.events[1].lat,
                lng: yelp.events[1].lng
            }
            yelp.waypoints = [];
        } else {
            yelp.destination = {
                lat: yelp.events[yelp.events.length - 1].lat,
                lng: yelp.events[yelp.events.length - 1].lng
            }
            for (var i = 1; i < yelp.events.length - 1; i++) {

                yelp.waypoints.push({
                    location: {
                        lat: yelp.events[i].lat,
                        lng: yelp.events[i].lng
                    },
                    stopover: true
                });
            }
        }

        directionsService.route({
            origin: yelp.origin,
            destination: yelp.destination,
            waypoints: yelp.waypoints,
            optimizeWaypoints: true,
            travelMode: 'DRIVING'
        }, function(response, status) {
            if (status === 'OK') {
                directionsDisplay.setDirections(response);
                var route = response.routes[0];
                var summaryPanel = document.getElementById('directions-panel');
                summaryPanel.innerHTML = '';
                // For each route, display summary information.
                for (var i = 0; i < route.legs.length; i++) {
                    var routeSegment = i + 1;
                    summaryPanel.innerHTML += '<b>Route Segment: ' + routeSegment +
                        '</b><br>';
                    summaryPanel.innerHTML += route.legs[i].start_address + ' to ';
                    summaryPanel.innerHTML += route.legs[i].end_address + '<br>';
                    summaryPanel.innerHTML += route.legs[i].distance.text + '<br><br>';
                }
            } else {
                window.alert('Directions request failed due to ' + status);
            }
        });
    }
}

function randomString(length, chars) {
    var result = '';
    for (var i = length; i > 0; --i) result += chars[Math.round(Math.random() * (chars.length - 1))];
    return result;
}
