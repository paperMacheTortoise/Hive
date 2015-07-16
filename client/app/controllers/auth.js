angular.module('authCtrl',['firebase'])

  .controller('SignupController', function ($state, $firebaseAuth, Auth, Users, $rootScope){
    var vm = this;
    Auth.signout();

    vm.setupUser = function(name, email, uid, pictureUrl){
      vm.users = Users.getUsers();
      vm.users.$add({
        username: name,
        email: email,
        uid: uid,
        pictureUrl: pictureUrl || null,
        pictureCollection: null
      }).then(function(ref){
        var logInfo = vm.users.$getRecord(ref.key());
        $rootScope.logInfo = logInfo;
        $rootScope.shouldShow = false;
        console.log(logInfo);
      });
    };

    vm.email = null;
    vm.password = null;
    vm.orgCode = null;
    vm.name = null;

    vm.signup = function(){
      Auth.signup(vm.email,vm.password, function(data){
        vm.authData = data;
        vm.setupUser(vm.name,vm.email,data.uid,data.password.profileImageURL);
        $state.go('main');
      },vm);
    };

    vm.checkLogin = function(){
      Auth.getAuth(function(data){
        vm.authData = data;
      });
    };
  })

  .controller('SigninController',function ($state,$firebaseAuth, Auth, $rootScope, Users){
    var vm = this;
    Auth.signout();
    vm.email = null;
    vm.password = null;

    vm.getSignIn = function(data){
      vm.users = Users.getUsers();
      console.log(data.uid);
      var key;
      for (var i = 0; i < vm.users.length; i++) {
        if(vm.users[i].uid===data.uid){
          key = vm.users.$keyAt(i);
        }
      }
      var logInfo = vm.users.$getRecord(key);
      $rootScope.logInfo = logInfo;
      $rootScope.shouldShow = false;
      console.log(logInfo);
    };

    vm.signin = function(){
      Auth.signin(vm.email,vm.password,function(data){
        vm.authData = data;
        console.log(data);
        vm.getSignIn(data);
        $state.go('main');
      },vm);
    };
    
    vm.checkLogin = function(){
      Auth.getAuth(function(data){
        vm.authData = data;
      });
  };
});