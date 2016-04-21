'use strict'

angular.module('WYA-App')
    .controller('cookSetTimeCtrl', function($stateParams, $state, $firebaseObject, $log, BASE_URL, Auth, $http, GetLocation) {
       var self = this;
       var current = Auth.getCurrentUser();
       var ref = new Firebase(BASE_URL + 'users/' + current.uid);
       this.title = current.title || '';
       this.description = current.description || '';
       this.endDate = current.endDate || '';
       this.saveBut = "SAVE INFO";
       this.openCal = function() {
           self.open = !self.open;
       }
       this.user = $firebaseObject(ref);


       this.saveCookInfo = function() {

            console.log(self.user);

            var endDate = angular.element(document.querySelector("#endDate")).val();

            self.user.title =  self.title;
            self.user.description = self.description;
            self.user.endDate = endDate;

            self.user.$save();

            console.log(self.endDate);
            console.log(angular.element(document.querySelector("#endDate")).val());

            self.saveBut = "SAVED !";

       }

       this.getLoc = function() {
           if (!self.user.title || !self.user.description) {
               return alert("Please enter a title and description");
           }
            GetLocation.getLocation('cook-map');
       }

       console.log(current.uid);

    })
