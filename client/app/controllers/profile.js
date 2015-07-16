angular.module('profileCtrl',['firebase','ui.bootstrap'])

.controller('ProfileController',function ($scope, $state, $firebaseAuth, Auth, $rootScope, $modal, $log, Users){
  var vm = this;

  vm.pictures = Users.getUserPictures($rootScope.logInfo.$id);
  vm.userInfo = $rootScope.logInfo;
  vm.username = vm.userInfo.username;
  vm.email = vm.userInfo.email;
  vm.pictureUrl = vm.userInfo.pictureUrl;

  vm.open = function () {
  //Opens modal for uploading
    var modalInstance = $modal.open({
      animation: true,
      templateUrl: 'app/upload/upload.html',
      controller: 'UploadController',
      size: 'sm'
    });
    modalInstance.result.then(function () {
    }, function () {
      $log.info('Modal dismissed at: ' + new Date());
    });
  };
});