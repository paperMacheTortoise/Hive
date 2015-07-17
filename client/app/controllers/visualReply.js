angular.module('visualReplyCtrl', [])

.controller('visualReplyController', function (Visualization, Replies, $rootScope, $stateParams){

	var vm = this;
	vm.org = $stateParams.org;
	vm.username = $rootScope.logInfo.username;
	vm.visualId = Visualization.getName();

	vm.isReplying = false;

	vm.toggleReplying = function(){
		vm.isReplying = !vm.isReplying;
	};

	vm.addVisualReply = function (e, index) {
		if(e.keyCode === 13) {
			Replies.addVisualReply(vm.username, vm.replyText, index, vm.visualId, vm.org);
			vm.replyText = '';
		}
	};
});
