'use-strict'

angular.module("WYA-App")
    .controller('nearbyCtrl', function($stateParams, $state, $firebaseArray, BASE_URL, locations, $http) {
       var self = this;
    
       
       this.zipCode = $stateParams.zipCode;
       this.address = $stateParams.curAddress;
       
       //map marking 
       this.lat = $stateParams.currentLocation.lat;
       this.lon = $stateParams.currentLocation.lon;
       
       this.currentLocation = $stateParams.currentLocation;
       
       
       if(!$stateParams.currentLocation.lat || this.zipCode === "") {
           $state.go('get-location');
       }
       
       this.map = {center: {latitude: this.lat, longitude: this.lon }, zoom: 14 };
       
       locations.$loaded() 
       //if array empty have some kind of return (like go back to prev route)
        .then(function(results) {
            
           console.log(results);
           
           self.data = results;
                          
        });
        
        console.log(self.data);
    })