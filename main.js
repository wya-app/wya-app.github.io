angular.module('WYA-App', ['ui.router','ngAnimate','ui.bootstrap'])
    .constant('BASE_URL', "https://resplendent-fire-801.firebaseio.com/")
    .config(function($stateProvider,$urlRouterProvider) {
        $urlRouterProvider.otherwise('./login')
        
        $stateProvider
            .state('login', {
                url: '/login',
                templateUrl: 'index.html'
            })
            .state('main',{
                url: '/main',
                templateUrl: 'main.html'
            })
    });