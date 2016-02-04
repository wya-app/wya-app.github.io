'use-strict'

angular.module("WYA-App")
    .controller('nearbyCtrl', function($stateParams, $state, $firebaseArray, BASE_URL, $http) {
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
       
       this.marker = {
           id: 0,
           coords: {
                latitude: lat,
                longitude: lon
           }
       }
       
       console.log($stateParams);
       
       //think about if theres empty areas with no trucks *** run a check
       
           
        this.ref = new Firebase(BASE_URL +"food/"+ this.zipCode );
        this.locations = $firebaseArray(this.ref);
        
        this.saveLocation = function() {
           self.locations.$add(self.currentLocation);
       };
       
        
        
        //there should be a func that pulls the lat and lon from firebase
        //then will be able to ng-repeat in the array and assign each a marker       

    })