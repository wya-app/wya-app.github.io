angular.module('WYA-App')
    .controller('mainCtrl', function($location, $state, Auth){
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
    })