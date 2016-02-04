angular.module("WYA-App")
    .controller("cookMapCtrl", function($stateParams, $state, $firebaseArray, BASE_URL, $http){
               
       //shows / sets map with current position 
       var lat = $stateParams.currentLocation.lat;
       var lon = $stateParams.currentLocation.lon;
       
       this.currentLocation = $stateParams.currentLocation;
       
       if(!$stateParams.currentLocation.lat) {
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
          
       this.ref = new Firebase(BASE_URL +"food/"+ this.zipCode );
       this.locations = $firebaseArray(this.ref); 
        
               
       this.saveLocation = function() {
           self.locations.$add(self.currentLocation);
       };
       
       
        
    })