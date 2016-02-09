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
            // self.markers1 = data;
            // console.log(self.markers1[0].lat);
            
            self.marker = {
                id: 0,
                coords: {
                        latitude: data[0].lat,
                        longitude: data[0].lon
                }
            }
            self.marker2 = {
                id: 1,
                coords: {
                        latitude: data[1].lat,
                        longitude: data[1].lon
                }
            }
            //store data in an array
            // each index should be the id                      
        });
       
    //    console.log($stateParams);
       
       //think about if theres empty areas with no trucks *** run a check
         
        //there should be a func that pulls the lat and lon from firebase
        //then will be able to ng-repeat in the array and assign each a marker       

    })