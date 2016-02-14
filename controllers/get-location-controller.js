angular.module('WYA-App')
    .controller('getLocationCtrl', function($stateParams, $state, $firebaseArray, BASE_URL, $http, GetLocation) {
       var self = this;
       
       this.getLoc =  function() {
           
          GetLocation.getLocation('nearby');
       }
       
              
    })