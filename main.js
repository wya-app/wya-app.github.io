angular.module('WYA-App', ['ui.router','ngAnimate','ui.bootstrap','firebase'])
    .constant('BASE_URL', "https://resplendent-fire-801.firebaseio.com/")
    .config(function($stateProvider,$urlRouterProvider) {
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
    });