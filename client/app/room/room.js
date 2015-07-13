// Angular controller for room.html
console.log('room.js');
angular.module('roomCtrl', [])

.controller('roomController', ["$firebaseArray", function ($firebaseArray) {

  var vm = this;

  this.addMessage = function (e) {
    if (e.keyCode === 13 && vm.text) {
      var userName = vm.username || 'anon';
      var roomName = vm.roomname || 'general';
      console.log(userName, roomName, vm.text);

    var url = "https://bizgramer.firebaseio.com/hr/rooms/" + roomName;
    console.log(url);
    var ref = new Firebase(url);

    vm.allMessages = $firebaseArray(ref);

      vm.allMessages.$add({
        username: userName,
        // room: roomName,
        text: vm.text
      });

      vm.text = '';
    }
  }
}]);


