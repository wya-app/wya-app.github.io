'use-strict'

angular.module('WYA-App', ['ui.router','ngAnimate','ui.bootstrap','firebase','ngLodash','ui-leaflet' ])
    .constant('BASE_URL', "https://resplendent-fire-801.firebaseio.com/")
    .config(function($stateProvider, $urlRouterProvider) {

        $urlRouterProvider.otherwise('/login')

        $stateProvider
            .state('welcome', {
                url: '/welcome',
                templateProvider: function($templateCache) {
                    return $templateCache.get('welcome.html');
                }
            })
            .state('login', {
                url: '/login',
                // templateUrl: 'views/login.html'
                templateProvider: function($templateCache) {
                    return $templateCache.get('login.html');
                }
            })

            .state('serve-look', {
                url: '/serve-look',
                templateProvider: function($templateCache) {
                    return $templateCache.get('serve-look.html');
                },
                controller: 'getLocationCtrl as location',
                authenticate: true
            })

            .state('nearby', {
                url: '/nearby/:zipCode',
                templateProvider: function($templateCache) {
                    return $templateCache.get('nearby.html');
                },
                params: {
                    currentLocation: {}
                },
                controller: 'nearbyCtrl as nearby',
                authenticate: true,
                resolve: {
                    locations: function($stateParams, $firebaseArray, BASE_URL) {
                       var ref = new Firebase(BASE_URL +"food/"+ $stateParams.zipCode );
                       return $firebaseArray(ref);

                    }
                }
            })

            // cook views
            .state('cook-map', {
                url: '/cook-map/:zipCode',
                templateProvider: function($templateCache) {
                    return $templateCache.get('cook-map.html');
                },
                params: {
                  currentLocation: {}
                },
                controller: 'cookMapCtrl as cookMap',
                authenticate: true,

            })

            .state('cook-set-time', {
                url: '/cook-set-time',
                templateProvider: function($templateCache) {
                    return $templateCache.get('cook-set-time.html');
                },
                params: {
                  currentLocation: {}
                },
                controller: 'cookSetTimeCtrl as cookTime',
                authenticate: true,
            })

    })
    .run(function ($rootScope, $state, Auth) {
    $rootScope.$on("$stateChangeStart", function(event, toState, toParams, fromState, fromParams){
        if (toState.authenticate && !Auth.getCurrentUser()){
            $state.go("welcome");
            event.preventDefault();
        }
    })
    });

'use-strict'

angular.module('WYA-App')
    .factory('Auth', function(BASE_URL, $firebaseObject){
        var currentUser;
        var self = this;
        var ref = new Firebase(BASE_URL);
        function updateUser(userData) {
            if (userData === null) {
                return false;
            }
            var user = ref.child("users").child(userData.uid);
            if (userData.twitter) {
                user.update({
                    uid: userData.uid,
                    displayName: userData.twitter.username,
                    userDesc: userData.twitter.cachedUserProfile.description                
                });
            } else {
               user.update({
                   uid: userData.uid,
                   displayName: userData.facebook.displayName
               });
            }

            user = $firebaseObject(user);
            currentUser = user;
            
            return user;
        }        
        return {
            tLogin: function(){
                ref.authWithOAuthPopup("twitter", function(error, authData) {
                    if(error) {
                        console.log(error);
                
                    } else {
                        console.log(authData);
                    }
                });
            },
            fbLogin: function() {
                ref.authWithOAuthPopup("facebook", function(error, authData) {
                   if (error) {
                       console.log("Login Failed!", error);
                   } else {
                       console.log("Authentication successfully with payload:", authData);
                   }
                });
            },
            logOut: function() {
                ref.unauth()
            },   
            onAuth: function(cb) {
                ref.onAuth(function(userData) {
                    cb(updateUser(userData));
                })
            },
            
            getCurrentUser: function() {
                return currentUser;
            },
            getUserFire: function() {
                return new Firebase;
            }
        }
    })
angular.module("WYA-App")
    .factory("GetLocation", function($state,$http) {
        return {
       
                //gets the current location with lon and lat
                getLocation : function(stateGo) {
                    navigator.geolocation.getCurrentPosition(function(position) {
                        console.log(position);
                        
                                    
                    var currentPosition = {
                        lat: position.coords.latitude,
                        lon: position.coords.longitude

                    }
                    
                    var lat = currentPosition.lat;
                    var lon = currentPosition.lon;
                    var zip = "";
                    var address = "";           
                    
                        $http.get('https://maps.googleapis.com/maps/api/geocode/json?latlng='+lat+','+lon+'&key=AIzaSyBGUmHjmyMHQBMmKnVW7yE5DRpSeQqDbE0').then(function successCallback(response) {
                            
                        var addressComponents = response.data.results[0].address_components;                 
                                                       
                        
                        _.forEach(addressComponents, function(value){
                                if (value.types[0] === 'postal_code') {
                                    console.log(value);
                                    zip = value.long_name;
                                }
                        });
                        
                        address= response.data.results[0].formatted_address;

                            //needs error check vvv
                            $state.go(stateGo, {
                                currentLocation: currentPosition,
                                zipCode: zip,
                                curAddress: address
                            });       
                            
                        }, function errorCallback(response) {
                            console.log('failed to get');
                        });           

                    });          
                }                  

        }
    })
'use-strict'

angular.module('WYA-App')
    .controller('mainCtrl', function($location, $state, Auth, $log, $timeout, $http, lodash){
        var self = this;
        var _ = lodash;
 
        this.twitterAuth = function() {
            Auth.tLogin();
        
        }
        this.faceBookAuth = function() {
            Auth.fbLogin();
        }
        
        this.logout = function() {
            Auth.logOut();
        }
        
        Auth.onAuth(function(userData){
           if (userData) {
               return $state.go('serve-look');
           } 
           
           return $state.go('login');
                  
        });
     
    })
'use-strict'

angular.module('WYA-App')
    .controller('getLocationCtrl', function($stateParams, $state, $firebaseArray, BASE_URL, $http, GetLocation) {
       var self = this;
       
       this.getLoc =  function() {
           
          GetLocation.getLocation('nearby');
       }
       
              
    })
'use-strict'

angular.module("WYA-App")
    .controller('nearbyCtrl', function($stateParams, $state, $firebaseArray, BASE_URL, locations, $http) {
       var self = this;
    
       
       this.zipCode = $stateParams.zipCode;
       this.address = $stateParams.curAddress;
       
       //map marking 
       var lat = $stateParams.currentLocation.lat;
       var lon = $stateParams.currentLocation.lon;
       
       this.currentLocation = $stateParams.currentLocation;
       
       
       if(!$stateParams.currentLocation.lat || this.zipCode === "") {
           $state.go('serve-look');
       }
              
       locations.$loaded() 
        .then(function(results) {
           console.log(results);
           
           if (results.length === 0) {
               alert("no trucks here!");
           }
          
           _.forEach(results, function(truck, i){
               console.log(i);
               if(i > results.length - 1) {
                   return false;                   
               } 
               else if (new Date(truck.endDate) < Date.now()) {
                   locations.$remove(truck);
                    
               }
                          
               self.markers = locations; 
             
           });
            
        });
        
            this.center = {
                lat: lat,
                lng: lon,
                zoom: 16
            };
    })
'use-strict'

angular.module('WYA-App')
    .controller('cookSetTimeCtrl', function($stateParams, $state, $firebaseObject, $log, BASE_URL, Auth, $http, GetLocation) {
       var self = this;
       var current = Auth.getCurrentUser();
       var ref = new Firebase(BASE_URL + 'users/' + current.uid);
       this.title = current.title || '';
       this.description = current.description || '';
       this.endDate = current.endDate || '';
       this.saveBut = "SAVE INFO";
       this.openCal = function() {
           self.open = !self.open;
       }
       this.user = $firebaseObject(ref);
       
       
       this.saveCookInfo = function() {

            console.log(self.user);

            var endDate = angular.element(document.querySelector("#endDate")).val();

            self.user.title =  self.title;
            self.user.description = self.description;
            self.user.endDate = endDate;

            self.user.$save();

            console.log(self.endDate);
            console.log(angular.element(document.querySelector("#endDate")).val());
            
            self.saveBut = "SAVED !";
            
       }
       
       this.getLoc = function() {
           if (!self.user.title || !self.user.description) {
               return alert("Please enter a title and description");
           }
            GetLocation.getLocation('cook-map');
       }
       
       console.log(current.uid);
       
    })

'use-strict'

angular.module("WYA-App")
    .controller("cookMapCtrl", function($stateParams, $state, $firebaseArray, BASE_URL, $http, Auth, $firebaseObject) {
       var self = this;         
 
       this.confirmation = "Is this correct?"
       this.zipCode = $stateParams.zipCode;
       this.address = $stateParams.curAddress;
       
       //map marking 
       var lat = $stateParams.currentLocation.lat;
       var lon = $stateParams.currentLocation.lon;
       
       this.currentLocation = $stateParams.currentLocation;
       
       if(!$stateParams.currentLocation.lat || this.zipCode === "") {
           $state.go('cook-set-time');
       }        
        
       console.log($stateParams);
       
       
       this.ref = new Firebase(BASE_URL +"food/"+ this.zipCode);
       this.locations = $firebaseArray(this.ref);
       
       var current = Auth.getCurrentUser();
       var user = $firebaseObject(new Firebase(BASE_URL +"users/"+current.uid)); 
        
       //Save info to firebase        
       this.saveLocation = function() {
           if (user.cooksPin && user.cooksPin.zip) {
              removePin();              
           }           
           self.locations.$add({               
                lat: lat,
                lng: lon,
                focus: false,
                endDate: current.endDate,
                message:"<h3><u>"+ current.title + "</u></h3>\n<b>Description:</b> " + current.description + "<br><b>End date: </b> " + current.endDate   
                                
           })
           .then(function(ref){               
               updateUser(ref);
           });
           self.confirmation = "You are now set"
       };
       
       function updateUser(ref) {
            user.cooksPin = {
                zip: self.zipCode,
                hash: ref.key()
            }
                
            user.$save();           
       }
       
       function removePin() {
            var oldPin = $firebaseObject(new Firebase(BASE_URL + "food/"+ user.cooksPin.zip+"/"+ user.cooksPin.hash));
            
            oldPin.$remove();                  
       }
       
       //for the map
        this.center = {
            lat: lat,
            lng: lon,
            zoom: 16
        };
        this.markers = {
            marker1: {
                lat: lat,
                lng: lon,
                focus: false,
                message:"<h3><u>"+ current.title + "</u></h3>\n<b>Description:</b> " + current.description + "<br><b>End date: </b> " + current.endDate
            }             
        };
          
       
        
    })
    