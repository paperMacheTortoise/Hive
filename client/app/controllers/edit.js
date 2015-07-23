angular.module('EditCtrl',['firebase'])

.controller('EditController',function ($scope, $state, $firebaseAuth, Auth, $rootScope, Users, $stateParams){
  var vm = this;
  vm.org = $stateParams.org;
  vm.pictures = Users.getUserPictures($rootScope.logInfo.$id, vm.org);
  vm.userInfo = $rootScope.logInfo;
  console.log(vm.userInfo);
  vm.username = vm.userInfo.username;
  vm.email = vm.userInfo.email;
  vm.pictureUrl = vm.userInfo.pictureUrl;
  vm.update = function(){
    console.log('updating');
    Users.updateProfile(vm.username, vm.pictureUrl, $rootScope.logInfo.$id, vm.org);
    $state.go('profile',{org:vm.org});
  };

});
