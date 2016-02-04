angular.module('WYA-App')
    .controller('cooksCtrl', function($stateParams, $state, $firebaseArray, BASE_URL, $http) {
       var self = this;
       
       //gets the current location with lon and lat
       this.getLocation = function() {
           navigator.geolocation.getCurrentPosition(function(position) {
               console.log(position);
               
                          
           var currentPosition = {
               lat: position.coords.latitude,
               lon: position.coords.longitude
           }
           
                      
           $state.go('cook-location', {
               currentLocation: currentPosition
           });
           
           console.log(currentPosition.lat);
           console.log(currentPosition.lon); 
           });


       }   
       
       //shows / sets map with current position 
       var lat = $stateParams.currentLocation.lat;
       var lon = $stateParams.currentLocation.lon;
       
       this.currentLocation = $stateParams.currentLocation;
       
       if(!$stateParams.currentLocation.lat) {
           $state.go('set-time');
       }
       
       this.map = {center: {latitude: lat, longitude: lon }, zoom: 14 };
       
       this.marker = {
           id: 0,
           coords: {
                latitude: lat,
                longitude: lon
           }
       }   
        
               
       this.saveLocation = function() {
           self.locations.$add(self.currentLocation);
       };
        
        

    })