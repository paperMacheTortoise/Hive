// Angular controller for room.html
angular.module('roomCtrl', [])

.controller('roomController', function (Rooms, $rootScope, $stateParams) {
  console.log($stateParams);
  var vm = this;
  vm.org = $stateParams.org;
  vm.roomname = $stateParams.roomName;
  Rooms.setRoom(vm.roomname, vm.org);
  vm.messages = Rooms.getRoomMessages(vm.org);
  vm.username = $rootScope.logInfo.username;

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


