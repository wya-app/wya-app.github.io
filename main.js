'use-strict'

angular.module('WYA-App', ['ui.router','ngAnimate','ui.bootstrap','firebase','ngLodash','ui-leaflet' ])
    .constant('BASE_URL', "https://resplendent-fire-801.firebaseio.com/")
    .config(function($stateProvider, $urlRouterProvider) {
        
        $urlRouterProvider.otherwise('/login')
        
        $stateProvider
            .state('login', {
                url: '/login',
                // templateUrl: 'views/login.html'
                templateProvider: function($templateCache) { 
                    return $templateCache.get('login.html'); 
                }                
            })
            
            .state('serve-look', {
                url: '/serve-look',
                templateProvider: function($templateCache) { 
                    return $templateCache.get('serve-look.html'); 
                },                  
                controller: 'getLocationCtrl as location',
                authenticate: true
            })

            .state('nearby', {
                url: '/nearby/:zipCode',
                templateProvider: function($templateCache) { 
                    return $templateCache.get('nearby.html'); 
                },                  
                params: {
                    currentLocation: {}
                },
                controller: 'nearbyCtrl as nearby',
                authenticate: true,                
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
                templateProvider: function($templateCache) { 
                    return $templateCache.get('cook-map.html'); 
                },                  
                params: {
                  currentLocation: {}  
                },
                controller: 'cookMapCtrl as cookMap',
                authenticate: true,                                
                
            })
            
            .state('cook-set-time', {
                url: '/cook-set-time',
                templateProvider: function($templateCache) { 
                    return $templateCache.get('cook-set-time.html'); 
                },                  
                params: {
                  currentLocation: {}  
                },
                controller: 'cookSetTimeCtrl as cookTime',
                authenticate: true,                                
            })
                               
    })
    .run(function ($rootScope, $state, Auth) {
    $rootScope.$on("$stateChangeStart", function(event, toState, toParams, fromState, fromParams){
        if (toState.authenticate && !Auth.getCurrentUser()){
            $state.go("login");
            event.preventDefault(); 
        }
    })
    });   