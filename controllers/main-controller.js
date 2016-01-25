angular.module('WYA-App')
    .controller('mainCtrl', function(twitAuth, fbAuth){
        this.twitterAuth = function() {
            twitAuth.login();
        }
        twitAuth.onAuth();
        
        this.faceBookAuth = function() {
            fbAuth.login();
        }
    })