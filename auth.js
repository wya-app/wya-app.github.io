angular.module('WYA-App')
    .factory('twitAuth', function(BASE_URL){
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
    })
    .factory('fbAuth', function(BASE_URL) {
        var self = this;
        var ref = new Firebase(BASE_URL);
        return {
            login: function() {
                ref.authWithOAuthPopup("facebook", function(error, authData) {
                   if (error) {
                       console.log("Login Failed!", error);
                   } else {
                       console.log("Authentication successfully with payload:", authData);
                   }
                });
            }
        }
        
    });