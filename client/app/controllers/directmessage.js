angular.module('directMessageCtrl', [])

.controller('directMessageController', function (DirectMessage, Users, $rootScope, $stateParams){

	var vm = this;
	// Passes the user from the main view to the directmessage view.
	vm.org = $stateParams.org;
	vm.recipient = $stateParams.user;
	// Tracks the user currently logged-in.
	vm.currentUser = $rootScope.logInfo.username;
	// Retrieves the messages for this user from the db.
	vm.messages = DirectMessage.getDirectMessages(vm.currentUser, vm.recipient);
	Users.setUsername(vm.recipient); // CHECK IF NECESSARY

	// Sends the message from the current user to the dmFactory.
	vm.addMessage = function(e){
		if (e.keyCode === 13) {
			console.log(vm.currentUser, vm.recipient, vm.text);
			DirectMessage.addMessage(vm.currentUser, vm.recipient, vm.text);
			vm.text = '';
		}
	};
});
