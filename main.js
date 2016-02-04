'use-strict'

angular.module('WYA-App', ['ui.router','ngAnimate','ui.bootstrap','firebase','uiGmapgoogle-maps','ngLodash' ])
    .constant('BASE_URL', "https://resplendent-fire-801.firebaseio.com/")
    .config(function($stateProvider, $urlRouterProvider, uiGmapGoogleMapApiProvider) {
        $urlRouterProvider.otherwise('/')
        
        $stateProvider
            .state('login', {
                url: '/login',
                templateUrl: 'views/login.html'
            })
            .state('serve-look', {
                url: '/serve-look',
                templateUrl: 'views/serve-look.html'
            })
            
            // customer views
            .state('get-location', {
                url: '/get-location',
                templateUrl: 'views/get-location.html',
                controller: 'getLocationCtrl as location'
            })
            
            .state('nearby', {
                url: '/nearby/:zipCode',
                templateUrl: 'views/nearby.html',
                params: {
                    currentLocation: {}
                },
                controller: 'nearbyCtrl as nearby',
            })
            
            // cook views
            .state('cook-map', {
                url: '/cook-map/:zipCode',
                templateUrl: 'views/cook-map.html',
                params: {
                  currentLocation: {}  
                },
                controller: 'cookMapCtrl as cookMap'
                
            })
            
            .state('cook-set-time', {
                url: '/cook-set-time',
                templateUrl: 'views/cook-set-time.html',
                params: {
                  currentLocation: {}  
                },
                controller: 'cookSetTimeCtrl as cookTime'
            })
                               
       
        uiGmapGoogleMapApiProvider.configure({
            key: 'AIzaSyBGUmHjmyMHQBMmKnVW7yE5DRpSeQqDbE0',
            v: '3.20', //defaults to latest 3.X anyhow
            libraries: 'weather,geometry,visualization'
        });
            
    });