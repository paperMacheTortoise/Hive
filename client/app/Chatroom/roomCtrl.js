// Angular controller for room.html
angular.module('roomCtrl', ['ngSanitize'])

.controller('roomController',['Rooms', '$rootScope', '$stateParams', 'Auth',function (Rooms, $rootScope,$stateParams, Auth) {
  var vm = this;
  // Passes the roomName from the main view.
  vm.roomname = $stateParams.roomName;
  vm.org = $stateParams.org;
  // Gets the messages from the roomFactory.
  vm.messages = Rooms.getRoomMessages(vm.roomname, vm.org);
  // Gets the current user.
  if(!$rootScope.logInfo){
    Auth.refreshUser(function(logInfo){
      $rootScope.logInfo = logInfo;
      vm.user = $rootScope.logInfo;
      vm.userame = vm.username;
      vm.profileImg = vm.user.profileUrl;
    });
  } else {
    vm.user = $rootScope.logInfo;
    vm.username = vm.user.username;
    vm.profileImg = vm.user.pictureUrl;
  }

  // Adds a message to the room and sends to the roomFactory.
  vm.addMessage = function (e) {
    if (e.keyCode === 13) {
      Rooms.addMessage(vm.username, vm.profileImg, vm.text, vm.roomname, vm.org);
      // empty the input field
      vm.text = '';
    }
  };
}]);



