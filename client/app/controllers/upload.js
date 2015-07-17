angular.module('uploadCtrl',['ui.bootstrap', 'firebase'])

.directive('customOnChange', function () {
  return {
    restrict: 'A',
    link: function (scope, element, attrs) {
      var onChangeHandler = scope.$eval(attrs.customOnChange);
      element.bind('change', onChangeHandler);
    }
  };
})

.controller('UploadController',function ($scope, $state, Upload, Users, $rootScope, $stateParams){
	this.file = null;
	this.org = $stateParams.org;

	$scope.change= function(evt){
		this.file = evt.target.files[0];
		console.log(this.file);
		Upload.putFile(this.file,this.file.name,function(imgUrl){
			// var users = Users.getUsers();
			var key = $rootScope.logInfo.$id;
			var pictures = Users.getUserPictures(key, this.org);
			pictures.$add({url:imgUrl});
		});
	};

	this.ok = function () {
		$state.go('profile');
	};
  });
