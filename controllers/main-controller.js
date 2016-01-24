angular.module('WYA-App')
    .controller('mainCtrl', function(auth){
        this.twitterAuth = function() {
            auth.login();
        }
        auth.onAuth();
    })