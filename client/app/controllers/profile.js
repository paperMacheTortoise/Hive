angular.module('profileCtrl',['firebase','ui.bootstrap', 'ngImgur'])

.controller('ProfileController',function ($scope, $state, $firebaseAuth, Auth, $rootScope, $modal, $log, Users, $stateParams, LinkedinAuth){
  var vm = this;
  vm.org = $stateParams.org;
  $rootScope.org = vm.org;
  vm.pictures = Users.getUserPictures($rootScope.logInfo.$id, vm.org);
  vm.userInfo = $rootScope.logInfo;
  vm.username = vm.userInfo.username;
  vm.email = vm.userInfo.email;
  vm.pictureUrl = vm.userInfo.pictureUrl;

  vm.open = function () {
  //Opens modal for uploading
    var modalInstance = $modal.open({
      animation: true,
      templateUrl: 'app/templates/upload.html',
      controller: 'UploadController',
      size: 'sm'
    });
    modalInstance.result.then(function () {
    }, function () {
      $log.info('Modal dismissed at: ' + new Date());
    });
  };

  vm.setFBInfo = function(){
    LinkedinAuth.setFBInfo(vm.org, $rootScope.logInfo.$id);
  };
})

.directive('customOnChange', function () {
  return {
    restrict: 'A',
    link: function (scope, element, attrs) {
      var onChangeHandler = scope.$eval(attrs.customOnChange);
      element.bind('change', onChangeHandler);
    }
  };
})

.controller('UploadController',function ( Upload, Users, $rootScope, $scope){
  $scope.file = null;

  $scope.change= function(evt){
    $scope.file = evt.target.files[0];
    Upload.putFile($scope.file,$scope.file.name,function(imgUrl){
      // var users = Users.getUsers();
      console.log(imgUrl);
      var key = $rootScope.logInfo.$id;
      var pictures = Users.getUserPictures(key, $rootScope.org);
      pictures.$add({url:imgUrl});
    });
  };

  $scope.ok = function () {
    $modalInstance.close('ok');
  };
  });
