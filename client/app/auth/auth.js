angular.module('app.auth',['firebase'])
  .controller('SignupController', function($scope, $state, $firebaseAuth){
    var vm = this;

    vm.email = null;
    vm.password = null;
    vm.orgCode = null;
    vm.signup = function(){
      var ref = new Firebase("https://bizgramer.firebaseio.com/");
      vm.authObj = $firebaseAuth(ref);
      vm.authObj.$createUser({
        email: vm.email,
        password: vm.password
      }).then(function(userData){
        console.log("User " + userData.uid + " created successfully!");
        return vm.authObj.$authWithPassword({
          email: vm.email,
          password: vm.password
        });
      }).then(function(authData){
        console.log('logged in as '+authData.uid);
      }).catch(function(error){
        console.log('Error:',error);
      });
    };
  });