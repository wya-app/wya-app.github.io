'use-strict'

angular.module('WYA-App')
    .controller('cookSetTimeCtrl', function($stateParams, $state, $firebaseObject, $log, BASE_URL, Auth, $http, GetLocation) {
       var self = this;
       var current = Auth.getCurrentUser();
       var ref = new Firebase(BASE_URL + 'users/' + current.uid);
       this.title = '';
       this.description = '';
       this.user = $firebaseObject(ref);
       
       this.saveCookInfo = function() {
           self.user.$add({
               title: self.title,
               description: self.description
           })
           console.log("click");
       }
       
       this.getLoc = function() {
           if (!self.user.title || !self.user.description) {
               return alert("Please enter a title and description");
           }
            GetLocation.getLocation('cook-map');
       }
       
       console.log(current.uid);
       
       

    })
    