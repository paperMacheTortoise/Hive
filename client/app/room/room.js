// Angular controller for room.html
angular.module('roomCtrl', [])

.controller('roomController', function (Rooms, $rootScope) {

  var vm = this;
  vm.roomname = Rooms.getCurrentName();
  vm.messages = Rooms.getRoomMessages();
  vm.username = $rootScope.logInfo.username;
  // var generalRef = new Firebase("https://bizgramer.firebaseio.com/hr/rooms/general");
  // vm.allGeneralMsg = $firebaseArray(generalRef);

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


