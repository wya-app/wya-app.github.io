angular.module("WYA-App")
    .factory("GetLocation", function($stateParams, $state, $firebaseArray, BASE_URL, $http) {
        return {
       
                //gets the current location with lon and lat
                getLocation : function(stateGo) {
                    navigator.geolocation.getCurrentPosition(function(position) {
                        console.log(position);
                        
                                    
                    var currentPosition = {
                        lat: position.coords.latitude,
                        lon: position.coords.longitude
                        // lat:33.821829,
                        // lon:-118.280217
                    }
                    
                    var lat = currentPosition.lat;
                    var lon = currentPosition.lon;
                    var zip = "";           
                    
                        $http.get('https://maps.googleapis.com/maps/api/geocode/json?latlng='+lat+','+lon+'&key=AIzaSyBGUmHjmyMHQBMmKnVW7yE5DRpSeQqDbE0').then(function successCallback(response) {
                            
                        var addressComponents = response.data.results[0].address_components;
                   
                        _.forEach(addressComponents, function(value){
                                if (value.types[0] === 'postal_code') {
                                    console.log(value);
                                    zip = value.long_name;
                                }
                        });
                            
                            //needs error check vvv
                            $state.go(stateGo, {
                                currentLocation: currentPosition,
                                zipCode: zip
                            });       
                            
                        }, function errorCallback(response) {
                            console.log('failed to get');
                        });           
                
                    console.log(currentPosition.lat);
                    console.log(currentPosition.lon);
                    console.log(zip);
                        
                    });          
                }                  

        }
    })