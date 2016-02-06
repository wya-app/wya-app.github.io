angular.module('WYA-App')
    .controller('cookSetTimeCtrl', function($stateParams, $state, $firebaseArray, BASE_URL, $http, GetLocation) {
       var self = this;
       
       GetLocation.getLocation('cook-map');
       
    })