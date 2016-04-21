'use strict'

angular.module("WYA-App")
    .controller("cookMapCtrl", function($stateParams, $state, $firebaseArray, BASE_URL, $http, Auth, $firebaseObject) {
       var self = this;

       this.confirmation = "Is this correct?"
       this.zipCode = $stateParams.zipCode;
       this.address = $stateParams.curAddress;

       //map marking
       var lat = $stateParams.currentLocation.lat;
       var lon = $stateParams.currentLocation.lon;

       this.currentLocation = $stateParams.currentLocation;

       if(!$stateParams.currentLocation.lat || this.zipCode === "") {
           $state.go('cook-set-time');
       }

       console.log($stateParams);


       this.ref = new Firebase(BASE_URL +"food/"+ this.zipCode);
       this.locations = $firebaseArray(this.ref);

       var current = Auth.getCurrentUser();
       var user = $firebaseObject(new Firebase(BASE_URL +"users/"+current.uid));

       //Save info to firebase
       this.saveLocation = function() {
           if (user.cooksPin && user.cooksPin.zip) {
              removePin();
           }
           self.locations.$add({
                lat: lat,
                lng: lon,
                focus: false,
                endDate: current.endDate,
                message:"<h3><u>"+ current.title + "</u></h3>\n<b>Description:</b> " + current.description + "<br><b>End date: </b> " + current.endDate

           })
           .then(function(ref){
               updateUser(ref);
           });
           self.confirmation = "You are now set"
       };

       function updateUser(ref) {
            user.cooksPin = {
                zip: self.zipCode,
                hash: ref.key()
            }

            user.$save();
       }

       function removePin() {
            var oldPin = $firebaseObject(new Firebase(BASE_URL + "food/"+ user.cooksPin.zip+"/"+ user.cooksPin.hash));

            oldPin.$remove();
       }

       //for the map
        this.center = {
            lat: lat,
            lng: lon,
            zoom: 16
        };
        this.markers = {
            marker1: {
                lat: lat,
                lng: lon,
                focus: false,
                message:"<h3><u>"+ current.title + "</u></h3>\n<b>Description:</b> " + current.description + "<br><b>End date: </b> " + current.endDate
            }
        };



    })
