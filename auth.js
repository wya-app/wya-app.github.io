angular.module('WYA-App')
    .factory('auth', function(BASE_URL){
        var self = this;
        var ref = new Firebase(BASE_URL);        
        return {
            login: function(){
                ref.authWithOAuthRedirect("twitter", function(error, authData) {
                    if(error) {
                        console.log(error);
                
                    } else {
                        console.log(authData);
                    }
                });
            },
            onAuth: function() {
                ref.onAuth(function(userData) {
                    console.log(userData);
                })
            }
        }
    });