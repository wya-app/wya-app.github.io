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
           $state.go('get-location');
       }
       
       this.map = {center: {latitude: lat, longitude: lon }, zoom: 14 };
       
       locations.$loaded() 
       //if array empty have some kind of return (like go back to prev route)
        .then(function(data) {
           console.log(data);
           self.markers = data;
           console.log(self.markers[0].label);                
        });
    })