angular.module('WYA-App')
    .controller('getLocationCtrl', function($stateParams, $state, $firebaseArray, BASE_URL, $http) {
       
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
            var address = "";
                                    
            $http.get('https://maps.googleapis.com/maps/api/geocode/json?latlng='+lat+','+lon+'&key=AIzaSyBGUmHjmyMHQBMmKnVW7yE5DRpSeQqDbE0').then(function successCallback(response) {
                var addressComponents = response.data.results[0].address_components;
                
                
                
               _.forEach(addressComponents, function(value){
                    if (value.types[0] === 'postal_code') {
                        console.log(value);
                        zip = value.long_name;
                    }
               });
               
               address = response.data.results[0].formatted_address;
                
                //needs error check vvv
                $state.go('nearby', {
                    currentLocation: currentPosition,
                    zipCode: zip,
                    curAddress: address
                });       
                
            }, function errorCallback(response) {
                console.log('failed to get');
            });           
     
           console.log(currentPosition.lat);
           console.log(currentPosition.lon);
            
           });


       }
              
    })