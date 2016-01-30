angular.module("WYA-App")
    .controller('nearbyCtrl', function($stateParams, $state, $firebaseArray, BASE_URL) {
       //map marking 
       var self = this;
       var lat = $stateParams.currentLocation.lat;
       var lon = $stateParams.currentLocation.lon;
       
       this.currentLocation = $stateParams.currentLocation
       
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
       
       var ref = new Firebase(BASE_URL + "food/carson");
       var locations = $firebaseArray(ref);
       
       this.saveLocation = function() {
           locations.$add(self.currentLocation);
       }

    })