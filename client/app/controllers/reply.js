// Angular controller for room.html
angular.module('replyCtrl', [])

.controller('replyController', function (Replies, Rooms, $rootScope, $stateParams) {

  var vm = this;
  vm.org = $stateParams.org;
  vm.isReplying = false;
  vm.replyusername = $rootScope.logInfo.username;

  // toggle to show the reply input box
  vm.toggleReplying = function() {
    this.isReplying = !(this.isReplying);
  };

  // add reply to the current message
  vm.addReply = function (e, index) {
    if (e.keyCode === 13) {
      var roomName = Rooms.getCurrentName(vm.org);
      var userName = vm.replyusername || 'anon';
      console.log(userName, vm.replytext, index, roomName);
      Replies.addReply(userName, vm.replytext, index, roomName, vm.org);
      vm.replytext = '';
    }
  };

});


