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
           if (userData === null) {
               return $state.go('login');
           } else {
               self.user = userData;
               return $state.go('serve-look');
           }                   
        });
        
       //get current location
       this.getLocation = function() {
           navigator.geolocation.getCurrentPosition(function(position) {
               console.log(position);
               
                          
           var currentPosition = {
               lat: position.coords.latitude,
               lon: position.coords.longitude
           }
           
            var lat = currentPosition.lat;
            var lon = currentPosition.lon;
            var zip = "";
                                    
            $http.get('https://maps.googleapis.com/maps/api/geocode/json?latlng='+lat+','+lon+'&key=AIzaSyBGUmHjmyMHQBMmKnVW7yE5DRpSeQqDbE0').then(function successCallback(response) {
                var address = response.data.results[0].formatted_address;
                var addressComponents = response.data.results[0].address_components;
                
                
               _.forEach(addressComponents, function(value){
                    if (value.types[0] === 'postal_code') {
                        console.log(value);
                        zip = value.long_name;
                    }
               })
                   

                   
         
                
                //needs error check vvv
                $state.go('nearby', {
                    currentLocation: currentPosition,
                    zipCode: zip
                });       
                
            }, function errorCallback(response) {
                console.log('failed to get');
            });           
     
           console.log(currentPosition.lat);
           console.log(currentPosition.lon);
            
           });


       }
        
    })