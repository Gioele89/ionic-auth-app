angular.module('app.routes', ['ionic'])

.config(function($stateProvider, $urlRouterProvider){
    
    $urlRouterProvider.otherwise('/');
    
    $stateProvider
        
        /*.state('app', {
            abstract: true,
            templateUrl: '/views/pages/main.html'
        })
        
        .state('app.index', {
            url: '/', 
            templateUrl: '/views/pages/login.html',
            controller: 'mainController as login'
        })
        
        .state('app.loggedIn', {
            url: '/login',
            templateUrl: '/views/pages/home.html'
        })*/
        
        .state('index', {
            url: '/',
            templateUrl: '/views/pages/main.html'
        })
        
        /*.state('app', {
            url: '/',
            templateUrl : '/views/pages/main.html'
        })*/
        
        .state('loggedIn', {
            abstract: true,
            /*data: { 
                rule: function() {
                    Auth.isLoggedIn();
                }
            },*/
            url: '/app',
            template: "<ion-nav-view></ion-nav-view>"
        })
        
        .state('loggedIn.index', {
            url: '',
            templateUrl: "/views/pages/home.html"
        });
        
        /*.state('players', {
            abstract: true,
            url: '/players',
            views: {
                players: {
                    template: "<ion-nav-view></ion-nav-view>"
                }
            }
        })
        
        .state('players.index', {
            url: '',
            templateUrl : 'views/pages/players/players.html',
            controller  : 'playersController as players', 
        })
    
        .state('players.detail', {
            url: '',
            params: {player:{}},
            templateUrl : 'views/pages/players/player-detail.html',
            controller  : 'playerDetailController as playerDetail'
        });
        */
});