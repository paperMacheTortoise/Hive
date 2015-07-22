angular.module('visualCtrl', [])

.controller('visualController', function ($stateParams, $rootScope, Visualization){
	var vm = this;

  // Get ther current user;
	vm.org = $stateParams.org;
	//chat functions
	vm.username = $rootScope.logInfo.username;
  // Gets the messages for the visualization.
	vm.messages = Visualization.getMessages(vm.org);

  vm.addMessage = function (e) {
    if(e.keyCode === 13){
      Visualization.addMessage(vm.username, vm.text, vm.org);
      vm.text = '';
    }
  };
});