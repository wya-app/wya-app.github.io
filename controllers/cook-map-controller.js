'use-strict'

angular.module("WYA-App")
    .controller("cookMapCtrl", function($stateParams, $state, $firebaseArray, BASE_URL, $http, Auth){
               
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
       
       var current = Auth.getCurrentUser(); 
        
               
       this.saveLocation = function() {
           self.locations.$add({
               id: self.locations.length,
               coords: {
                   latitude: lat,
                   longitude: lon
               },
               title: current.title,
               description: current.description
               
           });
        console.log(self.locations.length);
        console.log($firebaseArray(self.ref));
       };
       
       
        
    })