angular.module('authService', [])


// ##### AUTH FACTORY - LOGIN E GET INFO ####
// # $http per comunicare con le API        #
// # $q per ritornare oggetti come promesse #
// # AuthToken per gestire i token          #
// ##########################################
.factory('Auth', function($http, $q, AuthToken){
    
    var authFactory = {};
    
    // gestore per la login
    authFactory.login = function(username, password) {
        return $http.post('https://mean-machine-code-gioele89-1.c9.io/api/authenticate', {
            username: username,
            password: password
        }).success(function(data){
            AuthToken.setToken(data.token);
            return data;
        });
    };
    
    // gestore per il logout
    authFactory.logout = function() {
        AuthToken.setToken();
    };
    
    // controlla se l'utente è collegato
    authFactory.isLoggedIn = function() {
        if(AuthToken.getToken())
            return true;
        else
            return false;
    };
    
    // get infomazioni dell'utente
    authFactory.getUser = function() {
        if(AuthToken.getToken())
            return $http.get('https://mean-machine-code-gioele89-1.c9.io/api/me');
        else
            return $q.reject({ message: 'User has no token. ' });
    };
    
    // ritorna l'oggetto authFactory
    return authFactory;
    
})


// ###### AUTH TOKEN -  GESTIONE TOKEN ######
// # $window  per salvare token lato client #
// ##########################################
.factory('AuthToken', function($window){
    
    var authTokenFactory = {};
    
    // get il token
    authTokenFactory.getToken = function(){
        return $window.localStorage.getItem('token');
    };
    
    // set il token o pulisci il token
    authTokenFactory.setToken = function(token){
        if(token)
            $window.localStorage.setItem('token', token);
        else
            $window.localStorage.removeItem('token');
    };
    
    return authTokenFactory;
    
})

// ###### AUTH INTERCEPTOR - ATTACCA IL TOKEN A OGNI REQ ######
// # $location è il modulo per la redirect                    #
// ############################################################
.factory('AuthInterceptor', function($q, $location, AuthToken){
    
    var interceptorsFactory = {};
    
    // attacca il token a ogni richiesta
    interceptorsFactory.request = function(config) {
        
        var token = AuthToken.getToken();
        
        if(token)
            config.headers['x-access-token'] = token;
            
        return config;
    };
    
    /*  response.status contiene la risposta del server se questa è uguale
        a 403 allora allora pulisce il token e rediretta alla prima pagina  */
    interceptorsFactory.responseError = function(response){
        
        console.log(response.status);
        if(response.status == 403){
            AuthToken.setToken();
            $location.path('/');
        }
        
        return $q.reject(response);
    };
    
    return interceptorsFactory;
});

