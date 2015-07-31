angular.module('uploadCtrl',['firebase','ui.bootstrap', 'ngImgur'])

.controller('UploadController', [ '$modalInstance', '$scope', 'Upload', 'Users', '$rootScope', function ($modalInstance, $scope, Upload, Users, $rootScope){
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

  $scope.cancel = function() {
    $modalInstance.dismiss('cancel');
  };
}]);