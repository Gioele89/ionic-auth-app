angular.module('mainCtrl', ['authService'])

.controller('mainController', function($rootScope, $location, $state, Auth){
    
    var vm = this;
    
    // vale true se l'utente è collegato
    vm.loggedIn = Auth.isLoggedIn();

    $rootScope.$on('$stateChangeStart', function(e,toState,toParams,fromState){
        
        vm.loggedIn = Auth.isLoggedIn();
        console.log('logged: '+vm.loggedIn);
            
        // se sono collegato e cerco di collegarmi alla index l'evento viene impedito
        if(vm.loggedIn && toState.name === 'index')
            e.preventDefault();
        
        // se non sono anora collegato e sono all'index impedisco di andare in qualsiasi altra pagina
        if(!vm.loggedIn && fromState.name === 'index')
            e.preventDefault();
        
        // recupera le informazioni dell'utente al cambio di route
        Auth.getUser()
            .then(function(data){
                vm.user = data.data;
            });

    });
    
   // funzione che gestisce la form di login
   vm.doLogin = function() {
    
        // chiama la funzione di login
        Auth.login(vm.loginData.username, vm.loginData.password)
            .success(function(data){
                console.log(data);
                if(data.success)
                     $state.go('loggedIn.index');
                else
                    console.log('errore');
            });
   };
   
   vm.doLogout = function() {
       
       Auth.logout();
       
       // svuota le informazioni dell'utente
       vm.user = {};
       
       $state.go('index');
   };
    
});