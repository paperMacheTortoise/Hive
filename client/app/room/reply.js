// Angular controller for room.html
angular.module('replyCtrl', [])

.controller('replyController', function (Replies, Rooms) {

  var vm = this;
  vm.isReplying = false;

  // toggle to show the reply input box
  vm.toggleReplying = function() {
    this.isReplying = !(this.isReplying);
  };

});


