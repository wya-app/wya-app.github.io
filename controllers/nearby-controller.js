'use strict'

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
           $state.go('serve-look');
       }

       locations.$loaded()
        .then(function(results) {
           console.log(results);

           if (results.length === 0) {
               alert("no trucks here!");
           }

           _.forEach(results, function(truck, i){
               console.log(i);
               if(i > results.length - 1) {
                   return false;
               }
               else if (new Date(truck.endDate) < Date.now()) {
                   locations.$remove(truck);

               }

               self.markers = locations;

           });

        });

            this.center = {
                lat: lat,
                lng: lon,
                zoom: 16
            };
    })
