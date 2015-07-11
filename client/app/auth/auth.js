angular.module('app.auth',['firebase','bizGramFactories'])
  .controller('SignupController', function($scope, $state, $firebaseAuth,Auth){
    var vm = this;

    vm.email = null;
    vm.password = null;
    vm.orgCode = null;
    vm.signup = function(){
      Auth.signup(vm.email,vm.password, function(data){
        vm.authData = data;
        $state.go('main');
      },vm);
    };
    vm.checkLogin = function(){
      Auth.getAuth(function(data){
        vm.authData = data;
      });
    };
  })
  .controller('SigninController',function($scope,$state,$firebaseAuth, Auth){
    var vm = this;

    vm.email = null;
    vm.password = null;
    vm.signin = function(){
      Auth.signin(vm.email,vm.password,function(data){
        vm.authData = data;
        $state.go('main');
      },vm);
    };
    vm.checkLogin = function(){
      Auth.getAuth(function(data){
        vm.authData = data;
      });
  };
});