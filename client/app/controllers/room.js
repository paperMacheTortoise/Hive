// Angular controller for room.html
angular.module('roomCtrl', [])

.controller('roomController', function (Rooms, $rootScope,$stateParams) {
  var vm = this;
  // Passes the roomName from the main view.
  vm.roomname = $stateParams.roomName;
  vm.org = $stateParams.org;
  Rooms.setRoom(vm.roomname, vm.org); // CHECK IF NECESSARY
  // Gets the messages from the roomFactory.
  vm.messages = Rooms.getRoomMessages(vm.org);
  // console.log(vm.messages);
  // Gets the current user.
  vm.username = $rootScope.logInfo.username;

  // Adds a message to the room and sends to the roomFactory.
  this.addMessage = function (e) {
    if (e.keyCode === 13) {
      var userName = vm.username || 'anon';
      var roomName = vm.roomname || 'general';
      console.log(userName, roomName, vm.text);

      Rooms.addMessage(userName, vm.text, vm.org);
      vm.text = '';
    }
  };
});


