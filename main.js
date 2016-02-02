angular.module('WYA-App', ['ui.router','ngAnimate','ui.bootstrap','firebase','uiGmapgoogle-maps' ])
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
            .state('get-location', {
                url: '/get-location',
                templateUrl: 'views/get-location.html'
            })
            
            .state('nearby', {
                url: '/nearby',
                templateUrl: 'views/nearby.html',
                params: {
                    currentLocation: {}
                },
                controller: 'nearbyCtrl as nearby'
            })
            
            .state('cook-location', {
                url: '/cook-location',
                templateUrl: 'views/cook-location.html'
            })
            .state('set-time', {
                url: '/set-time',
                templateUrl: 'views/set-time.html',
            })
                               
       
        uiGmapGoogleMapApiProvider.configure({
            key: 'AIzaSyBGUmHjmyMHQBMmKnVW7yE5DRpSeQqDbE0',
            v: '3.20', //defaults to latest 3.X anyhow
            libraries: 'weather,geometry,visualization'
        });
            
    });