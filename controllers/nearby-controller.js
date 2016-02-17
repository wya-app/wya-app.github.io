'use-strict'

angular.module("WYA-App")
    .controller('nearbyCtrl', function($stateParams, $state, $firebaseArray, BASE_URL, locations, $http, $scope) {
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
       //if array empty have some kind of return (like go back to prev route)
        .then(function(results) {
            
           console.log(results);
           
           self.data = results;
           if (results.length === 0) {
               alert("no trucks here!");
           }
           self.markers = self.data;               
        });
        
       console.log(this.data);

       
            this.center = {
                lat: lat,
                lng: lon,
                zoom: 16
            };
            

       
        

    })