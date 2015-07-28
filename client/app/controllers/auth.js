angular.module('authCtrl',['firebase'])

  .controller('SignupController', function ($state, $firebaseAuth, Auth, Users, $rootScope, $stateParams, LinkedinAuth){
    var vm = this;
    vm.org = $stateParams.org;

    vm.setupUser = function(name, email, uid, pictureUrl){
      Auth.setupUser(name, vm.org, email, uid, pictureUrl, function(logInfo){
        $rootScope.logInfo = logInfo;
        LinkedinAuth.setOrg(logInfo.org);
        // redirect to main page in the organization after setting  logInfo on the rootscope of  signed-up user
        $state.go('main', {org: vm.org});
      });
    };

    vm.email = null;
    vm.password = null;
    vm.orgCode = null;
    vm.name = null;

    vm.signup = function(){
      Auth.signup(vm.email, vm.password, vm.orgId, vm.org, function(data){
        vm.authData = data;
        vm.setupUser(vm.name, vm.email, data.uid, data.password.profileImageURL);
        $state.go('main', {org: vm.org});
      },vm);
    };

    vm.checkLogin = function(){
      Auth.getAuth(function(data){
        vm.authData = data;
      });
    };
  })

  .controller('SigninController',function ($state,$firebaseAuth, Auth, LinkedinAuth, $rootScope, Users, $stateParams){
    var vm = this;
    vm.org = $stateParams.org;
    vm.email = null;
    vm.password = null;

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
      $state.go('main', {org: vm.org});
    });
    };

    vm.signin = function(){
      Auth.signin(vm.email,vm.password,function(data){
        vm.authData = data;
        vm.getSignIn(data);
      },vm);
    };

    vm.checkLogin = function(){
      Auth.getAuth(function(data){
        vm.authData = data;
      });
  };
});
