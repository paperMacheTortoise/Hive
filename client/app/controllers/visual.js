angular.module('visualCtrl', [])

.controller('visualController', function (Visualization, $rootScope){

	var vm = this;

	//chat functions
	vm.username = $rootScope.logInfo.username;
	vm.visualId = 'visual1';
	vm.messages = Visualization.getMessages(vm.visualId);

	vm.addMessage = function (e) {
		if(e.keyCode === 13){
			Visualization.addMessage(vm.username, vm.visualId, vm.text);
			vm.text = '';
		}
	};
});