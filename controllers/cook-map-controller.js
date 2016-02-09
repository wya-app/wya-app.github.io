'use-strict'

angular.module("WYA-App")
    .controller("cookMapCtrl", function($stateParams, $state, $firebaseArray, BASE_URL, $http){
               
       var self = this;
    
       
       this.zipCode = $stateParams.zipCode;
       this.address = $stateParams.curAddress;
       
       //map marking 
       var lat = $stateParams.currentLocation.lat;
       var lon = $stateParams.currentLocation.lon;
       
       this.currentLocation = $stateParams.currentLocation;
       
       if(!$stateParams.currentLocation.lat || this.zipCode === "") {
           $state.go('cook-set-time');
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
       
       
       this.ref = new Firebase(BASE_URL +"food/90745");
       this.locations = $firebaseArray(this.ref); 
        
               
       this.saveLocation = function() {
           self.locations.$add({
               id: self.locations.length,
               coords: {
                   lattitude: lat,
                   longitude: lon
               }
           });
        console.log(self.locations.length);
       };
       
       
        
    })