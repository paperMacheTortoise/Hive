// Angular controller for room.html
angular.module('roomCtrl', [])

.controller('roomController', function (Rooms, $rootScope,$stateParams) {
  
  var vm = this;
  // Passes the roomName from the main view.
  vm.roomname = $stateParams.roomName;
  Rooms.setRoom(vm.roomname); // CHECK IF NECESSARY
  // Gets the messages from the roomFactory.
  vm.messages = Rooms.getRoomMessages();
  // Gets the current user.
  vm.username = $rootScope.logInfo.username;

  // Adds a message to the room and sends to the roomFactory.
  this.addMessage = function (e) {
    if (e.keyCode === 13) {
      var userName = vm.username || 'anon';
      var roomName = vm.roomname || 'general';
      console.log(userName, roomName, vm.text);

      Rooms.addMessage(userName, vm.text);
      vm.text = '';
    }
  };
});


