angular.module('WYA-App')
    .controller('mainCtrl', function($location, $state, Auth, $log, $timeout){
        var self = this;
        
        this.twitterAuth = function() {
            Auth.tLogin();
        
        }
        this.faceBookAuth = function() {
            Auth.fbLogin();
        }
        
        this.logout = function() {
            Auth.logOut();
        }
        
        Auth.onAuth(function(userData){
           if (userData === null) {
               return $state.go('login');
           } else {
               self.user = userData;
               return $state.go('serve-look');
           }                   
        });
        
       //get current location
       this.getLocation = function() {
           navigator.geolocation.getCurrentPosition(function(position) {
               console.log(position);
               
                          
           var currentPosition = {
               lat: position.coords.latitude,
               lon: position.coords.longitude
           }
           
                      
           $state.go('nearby', {
               currentLocation: currentPosition
           });
           
           console.log(currentPosition.lat);
           console.log(currentPosition.lon); 
           });


       }
        
    })