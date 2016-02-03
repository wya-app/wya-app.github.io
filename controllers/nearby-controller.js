'use-strict'

angular.module("WYA-App")
    .controller('nearbyCtrl', function($stateParams, $state, $firebaseArray, BASE_URL, $http) {
       var self = this;
       
       //map marking 
       var lat = $stateParams.currentLocation.lat;
       var lon = $stateParams.currentLocation.lon;
       
       this.currentLocation = $stateParams.currentLocation;
       
       if(!$stateParams.currentLocation.lat) {
           $state.go('get-location');
       }
       
       this.map = {center: {latitude: lat, longitude: lon }, zoom: 14 };
       
       this.marker = {
           id: 0,
           coords: {
                latitude: lat,
                longitude: lon
           }
       }
       
       console.log($stateParams);
       
       var ref = new Firebase(BASE_URL + "food/90745");
       var locations = $firebaseArray(ref);
       
       this.saveLocation = function() {
           locations.$add(self.currentLocation);
       };

        $http.get('https://maps.googleapis.com/maps/api/geocode/json?latlng='+lat+','+lon+'&key=AIzaSyBGUmHjmyMHQBMmKnVW7yE5DRpSeQqDbE0').then(function successCallback(response) {
            var address = response.data.results[0].formatted_address;
            var addressComponents = response.data.results[0].address_components;
            var postalCode;
            
            //get postal code from current lat and lon
            for (var i = 0; i <= addressComponents.length; i++) {            
                for (var j = 0; j <= addressComponents[i].types.length; j++) {
                        if (addressComponents[i].types[j] === 'postal_code') {
                            console.log(addressComponents[i].long_name);
                            postalCode = addressComponents[i].long_name;                       
                        }
                    }
                }  
            
        }, function errorCallback(response) {
            console.log('failed to get');
        });       

    })