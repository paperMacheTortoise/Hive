angular.module('directMessageCtrl', [])

.controller('directMessageController', function (DirectMessage, Users, $rootScope, $stateParams){

	var vm = this;
	vm.org = $stateParams.org;
	vm.recipient = $stateParams.user;
	Users.setUsername(vm.recipient);
	vm.currentUser = $rootScope.logInfo.username;
	vm.messages = DirectMessage.getDirectMessages(vm.currentUser, vm.recipient);

	vm.addMessage = function(e){
		if (e.keyCode === 13) {
			console.log(vm.currentUser, vm.recipient, vm.text);
			DirectMessage.addMessage(vm.currentUser, vm.recipient, vm.text);
			vm.text = '';
		}
	};
});
