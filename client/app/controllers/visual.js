angular.module('visualCtrl', [])

.controller('visualController', function (Visualization, Replies, $rootScope){

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

	// replies
	vm.isReplying = false;
	
	vm.toggleReplying = function(){
		vm.isReplying = !vm.isReplying;
	};

	vm.addVisualReply = function (e, index) {
		if(e.keyCode === 13) {
			Replies.addVisualReply(vm.username, vm.replyText, index, vm.visualId);
			vm.replyText = '';
		}
	};
});