'use strict'

angular.module('WYA-App')
    .controller('mainCtrl', function($location, $state, Auth, $log, $timeout, $http, lodash){
        var self = this;
        var _ = lodash;

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
           if (userData) {
               return $state.go('serve-look');
           }

           return $state.go('login');

        });

    })
