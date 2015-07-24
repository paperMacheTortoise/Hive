angular.module('authCtrl',['firebase'])

  .controller('SignupController', function ($state, $firebaseAuth, Auth, Users, $rootScope, $stateParams, LinkedinAuth){
    var vm = this;
    vm.org = $stateParams.org;
    console.log('auth', $stateParams);
    vm.orgKey =

    vm.setupUser = function(name, email, uid, pictureUrl){
      vm.users = Users.getUsers(vm.org);
      vm.users.$add({
        username: name,
        org: vm.org,
        email: email,
        uid: uid,
        pictureUrl: pictureUrl || null,
        pictureCollection: null
      }).then(function(ref){
        var logInfo = vm.users.$getRecord(ref.key());
        $rootScope.logInfo = logInfo;
      });
    };

    vm.email = null;
    vm.password = null;
    vm.orgCode = null;
    vm.name = null;

    vm.signup = function(){
      Auth.signup(vm.email, vm.password, vm.orgId, vm.org, function(data){
        vm.authData = data;
        vm.setupUser(vm.name,vm.email,data.uid,data.password.profileImageURL);
        $state.go('main', {org: vm.org});
      },vm);
    };

    vm.linkedinSignup = function(){
      vm.users = Users.getUsers(vm.org);
      LinkedinAuth.getAuthObj()
        .then(function(data){
          vm.authData = data;
          // Users.addLinkedInUser(vm.org, data);
          vm.users.$add({
            username: data.linkedin.formattedName,
            org: vm.org,
            uid: data.uid,
            email: data.linkedin.emailAddress,
            pictureUrl: data.linkedin.pictureUrl,
            pictureCollection: null,
            linkedin: data.linkedin
          })
          .then(function(ref){
            var logInfo = vm.users.$getRecord(ref.key());
            $rootScope.logInfo = logInfo;
            $state.go('main', {org: vm.org});
          });
        });
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
      $state.go('main', {org: vm.org});
    });
    };

    // vm.linkedSignin = function() {
    //  LinkedinAuth.getAuthObj()
    //   .then(function(data){
    //     vm.getSignIn(data);
    //   });
    // };

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
