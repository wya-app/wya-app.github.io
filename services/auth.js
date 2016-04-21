'use strict'

angular.module('WYA-App')
    .factory('Auth', function(BASE_URL, $firebaseObject){
        var currentUser;
        var self = this;
        var ref = new Firebase(BASE_URL);
        function updateUser(userData) {
            if (userData === null) {
                return false;
            }
            var user = ref.child("users").child(userData.uid);
            if (userData.twitter) {
                user.update({
                    uid: userData.uid,
                    displayName: userData.twitter.username,
                    userDesc: userData.twitter.cachedUserProfile.description
                });
            } else {
               user.update({
                   uid: userData.uid,
                   displayName: userData.facebook.displayName
               });
            }

            user = $firebaseObject(user);
            currentUser = user;

            return user;
        }
        return {
            tLogin: function(){
                ref.authWithOAuthPopup("twitter", function(error, authData) {
                    if(error) {
                        console.log(error);

                    } else {
                        console.log(authData);
                    }
                });
            },
            fbLogin: function() {
                ref.authWithOAuthPopup("facebook", function(error, authData) {
                   if (error) {
                       console.log("Login Failed!", error);
                   } else {
                       console.log("Authentication successfully with payload:", authData);
                   }
                });
            },
            logOut: function() {
                ref.unauth()
            },
            onAuth: function(cb) {
                ref.onAuth(function(userData) {
                    cb(updateUser(userData));
                })
            },

            getCurrentUser: function() {
                return currentUser;
            },
            getUserFire: function() {
                return new Firebase;
            }
        }
    })
