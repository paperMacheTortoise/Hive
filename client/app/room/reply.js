// Angular controller for room.html
angular.module('replyCtrl', [])

.controller('replyController', function (Replies, Rooms) {

  var vm = this;
  vm.isReplying = false;

  // toggle to show the reply input box
  vm.toggleReplying = function() {
    this.isReplying = !(this.isReplying);
  };

  // add reply to the current message
  vm.addReply = function (e, index) {
    if (e.keyCode === 13) {
      var roomName = Rooms.getCurrentName();
      var userName = vm.replyusername || 'anon';
      console.log(userName, vm.replytext, index, roomName);
      Replies.addReply(userName, vm.replytext, index, roomName);
      vm.replytext = '';
    }
  };

});


