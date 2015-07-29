angular.module('authCtrl',['firebase','ui.bootstrap'])

  .controller('SignupController', function ($state, $firebaseAuth, Auth, Users, $rootScope, $stateParams, LinkedinAuth){
    var vm = this;
    vm.org = $stateParams.org;
    vm.alerts = [];
    vm.addAlert = function(message) {
      message = message.toLowerCase();
      message = message.charAt(0).toUpperCase() + message.slice(1);
      vm.alerts.push({type:'danger',msg: message});
    };
    vm.closeAlert = function(index) {
      vm.alerts.splice(index, 1);
    };
    vm.setupUser = function(name, email, uid, pictureUrl){
      Auth.setupUser(name, vm.org, email, uid, pictureUrl, function(error,logInfo){
        if(error){
          vm.addAlert(error.replace('_',' '));
          return;
        }
        $rootScope.logInfo = logInfo;
        LinkedinAuth.setOrg(logInfo.org);
        // redirect to main page in the organization after setting  logInfo on the rootscope of  signed-up user
        $state.go('main.room', {org: vm.org, roomname:'General'});
      });
    };

    vm.email = null;
    vm.password = null;
    vm.orgCode = null;
    vm.name = null;

    vm.signup = function(){
      Auth.signup(vm.email, vm.password, vm.orgId, vm.org, function(error, data){
        if(error){
          vm.addAlert(error.replace('_',' '));
          return;
        }
        vm.authData = data;
        vm.setupUser(vm.name, vm.email, data.uid, data.password.profileImageURL);
      },vm);
    };

    vm.checkLogin = function(){
      Auth.getAuth(function(error, data){
        if(error){
          vm.addAlert(error.replace('_',' '));
          return;
        }
        vm.authData = data;
      });
    };
  })

  .controller('SigninController',function ($state,$firebaseAuth, Auth, LinkedinAuth, $rootScope, Users, $stateParams){
    var vm = this;
    vm.org = $stateParams.org;
    vm.email = null;
    vm.password = null;
    vm.alerts = [];
    vm.addAlert = function(message) {
      message = message.toLowerCase();
      message = message.charAt(0).toUpperCase() + message.slice(1);
      vm.alerts.push({type:'danger',msg: message});
    };
    vm.closeAlert = function(index) {
      vm.alerts.splice(index, 1);
    };
    vm.getSignIn = function(data){
      vm.users = Users.getUsers(vm.org);
      vm.users.$loaded(function(){

      var key;
      for (var i = 0; i < vm.users.length; i++) {
        if(vm.users[i].uid===data.uid){
          key = vm.users.$keyAt(i);
        }
      }
      var logInfo = vm.users.$getRecord(key);
      $rootScope.logInfo = logInfo;
      LinkedinAuth.setOrg(logInfo.org);
      $state.go('main.room', {org: vm.org, roomName:'General'});
    });
    };

    vm.signin = function(){
      Auth.signin(vm.email,vm.password,function(error, data){
        if(error){
          vm.addAlert(error.replace('_',' '));
          return;
        }
        vm.authData = data;
        vm.getSignIn(data);
      },vm);
    };

    vm.checkLogin = function(){
      Auth.getAuth(function(error, data){
        if(error){
          vm.addAlert(error.replace('_',' '));
          return;
        }
        vm.authData = data;
      });
  };
});
