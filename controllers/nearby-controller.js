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
       
       locations.$loaded() //<< look this up 
       //look a way to check if there is any data
       //if array empty have some kind of return (like go back to prev route)
        .then(function(data) {
            console.log(data);
    
           self.markers = data;                    
        });
       
    //    console.log($stateParams);
       
       //think about if theres empty areas with no trucks *** run a check
         
        //there should be a func that pulls the lat and lon from firebase
        //then will be able to ng-repeat in the array and assign each a marker       

    })