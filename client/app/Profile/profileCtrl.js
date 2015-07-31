angular.module('profileCtrl',['firebase','ui.bootstrap', 'ngImgur'])

.controller('ProfileController',function ($scope, $state, $firebaseAuth, Auth, $rootScope, $modal, $log, Users, $stateParams, LinkedinAuth){
  var vm = this;
  vm.org = $stateParams.org;
  $rootScope.org = vm.org;
  vm.hasLinkedin = false;
  
  if(!$rootScope.logInfo){
    Auth.refreshUser(function(logInfo){
      $rootScope.logInfo = logInfo;
      vm.pictures = Users.getUserPictures($rootScope.logInfo.$id, vm.org);
      vm.userInfo = $rootScope.logInfo;
      vm.username = vm.userInfo.username;
      vm.email = vm.userInfo.email;
      vm.pictureUrl = vm.userInfo.pictureUrl;
      if($rootScope.logInfo.linkedin){
        vm.hasLinkedin = true;
      }
    });
  } else {
      vm.pictures = Users.getUserPictures($rootScope.logInfo.$id, vm.org);
      vm.userInfo = $rootScope.logInfo;
      vm.username = vm.userInfo.username;
      vm.email = vm.userInfo.email;
      vm.pictureUrl = vm.userInfo.pictureUrl;
      if($rootScope.logInfo.linkedin){
        vm.hasLinkedin = true;
      }
  }


    vm.host = window.host;

  vm.open = function () {
  //Opens modal for uploading
    var modalInstance = $modal.open({
      animation: true,
      templateUrl: 'app/Profile/Upload/upload.html',
      controller: 'UploadController',
      size: 'sm'
    });
    modalInstance.result.then(function () {
    }, function () {
      $log.info('Modal dismissed at: ' + new Date());
    });
  };

  // Sends the org and user uid to the server for linkedin oAuth
  vm.setFBInfo = function(){
    LinkedinAuth.setFBInfo(vm.org, $rootScope.logInfo.$id);
  };
});

