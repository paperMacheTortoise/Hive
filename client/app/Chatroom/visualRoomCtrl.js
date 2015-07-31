angular.module('visualCtrl', [])

.controller('visualController', ['$stateParams', '$rootScope', 'Visualization', function ($stateParams, $rootScope, Visualization){
	var vm = this;

  // Get ther current user;
	vm.org = $stateParams.org;
	//chat functions
  vm.user = $rootScope.logInfo;
	vm.username = vm.user.username;
  vm.profileImg = vm.user.pictureUrl;
  // Gets the messages for the visualization.
	vm.messages = Visualization.getMessages(vm.org);

  vm.addMessage = function (e) {
    if(e.keyCode === 13){
      Visualization.addMessage(vm.username, vm.profileImg, vm.text, vm.org);
      vm.text = '';
    }
  };
}]);