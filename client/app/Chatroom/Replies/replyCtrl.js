// Angular controller for chat text reply functionality (comment threading)
angular.module('replyCtrl', [])

.controller('replyController',['Replies', 'Rooms', '$rootScope', '$stateParams', 'Auth', function (Replies, Rooms, $rootScope, $stateParams, Auth) {

  var vm = this;
  vm.org = $stateParams.org;
  vm.roomname = $stateParams.roomName;
  // Value for toggling the reply option.
  vm.isReplying = false;
  // Gets the current user's username.
  if(!$rootScope.logInfo){
    Auth.refreshUser(function(logInfo){
      $rootScope.logInfo = logInfo;
      vm.user = $rootScope.logInfo;
      vm.replyusername = vm.user.username;
      vm.profileImg = vm.user.pictureUrl;
    });
  } else {
    vm.user = $rootScope.logInfo;
    vm.replyusername = vm.user.username;
    vm.profileImg = vm.user.pictureUrl;
  }

  // Toggle to show the reply input box
  vm.toggleReplying = function() {
    this.isReplying = !(this.isReplying);
  };

  // Add reply to the current message
  vm.addReply = function (e, index) {
    if (e.keyCode === 13) {
      Replies.addReply(vm.replyusername, vm.profileImg, vm.replytext, index, vm.roomname, vm.org);
      vm.replytext = '';
    }
  };

}]);


