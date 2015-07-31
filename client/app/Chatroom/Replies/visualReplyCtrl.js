angular.module('visualReplyCtrl', [])

.controller('visualReplyController', function (Visualization, Replies, $rootScope, $stateParams){

	var vm = this;

	// Retrieve the current organization.
	vm.org = $stateParams.org;
	// Get the current user.
	vm.user = $rootScope.logInfo;
	vm.username = vm.user.username;
	vm.profileImg = vm.user.pictureUrl;
	// The value for toggling the reply option.
	vm.isReplying = false;

	// Toggle the reply option on click.
	vm.toggleReplying = function(){
		vm.isReplying = !vm.isReplying;
	};

	// Add the reply to the current message on the visualization.
	vm.addVisualReply = function (e, index) {
		if(e.keyCode === 13) {
			Replies.addVisualReply(vm.username, vm.profileImg, vm.replyText, index, vm.org);
			vm.replyText = '';
		}
	};
});
