angular.module('app.profile',['firebase','bizGramFactories'])
  .controller('ProfileController',function($scope, $state, $firebaseAuth,Auth,$rootScope){
    var vm = this;
    vm.userInfo = $rootScope.logInfo;
    console.dir($rootScope.logInfo);
    vm.username = vm.userInfo.username;
    vm.email = vm.userInfo.email;
    vm.pictureUrl = vm.userInfo.pictureUrl;

  });