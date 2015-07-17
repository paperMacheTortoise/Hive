// Angular controller for room.html
angular.module('replyCtrl', [])

.controller('replyController', function (Replies, Rooms, $rootScope, $stateParams) {

  var vm = this;
  vm.org = $stateParams.org;
  // Value for toggling the reply option.
  vm.isReplying = false;
  // Gets the current user's username.
  vm.replyusername = $rootScope.logInfo.username;

  // Toggle to show the reply input box
  vm.toggleReplying = function() {
    this.isReplying = !(this.isReplying);
  };

  // Add reply to the current message
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


