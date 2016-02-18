'use-strict'

angular.module('WYA-App', ['ui.router','ngAnimate','ui.bootstrap','firebase','uiGmapgoogle-maps','ngLodash','ngMap','ui-leaflet' ])
    .constant('GOOGLE_MAPS_URL', "https://maps.googleapis.com/maps/api/js?key=AIzaSyBGUmHjmyMHQBMmKnVW7yE5DRpSeQqDbE0")
    .constant('BASE_URL', "https://resplendent-fire-801.firebaseio.com/")
    .config(function($stateProvider, $urlRouterProvider, uiGmapGoogleMapApiProvider) {
        
        $urlRouterProvider.otherwise('/login')
        
        $stateProvider
            .state('login', {
                url: '/login',
                templateUrl: 'views/login.html'
            })
            .state('serve-look', {
                url: '/serve-look',
                templateUrl: 'views/serve-look.html',
                controller: 'getLocationCtrl as location',
                authenticate: true
            })
            
            // customer views
            // .state('get-location', {
            //     url: '/get-location',
            //     templateUrl: 'views/get-location.html',
            //     controller: 'getLocationCtrl as location'
            // })
            
            .state('nearby', {
                url: '/nearby/:zipCode',
                templateUrl: 'views/nearby.html',
                params: {
                    currentLocation: {}
                },
                controller: 'nearbyCtrl as nearby',
                resolve: {
                    locations: function($stateParams, $firebaseArray, BASE_URL) {
                       var ref = new Firebase(BASE_URL +"food/"+ $stateParams.zipCode );
                       return $firebaseArray(ref);
    
                    }
                }
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
            
    })
    .run(function ($rootScope, $state, Auth) {
    $rootScope.$on("$stateChangeStart", function(event, toState, toParams, fromState, fromParams){
        if (toState.authenticate && !Auth.getCurrentUser()){
            $state.go("login");
            event.preventDefault(); 
        }
    })
    });   