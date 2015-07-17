angular.module('mainCtrl', [])

.controller('mainController', function (Rooms, Users, DirectMessage, $rootScope) {

	var vm = this;
  // Get ther current user
  vm.currentUser = $rootScope.logInfo.username;
  // Get the rooms from the roomFactory.
  vm.rooms = Rooms.getRooms();
  // Get all users except for the current user from the userFactory.
  vm.users = Users.getDisplayUsers(vm.currentUser);

  // Send new room to the roomFactory.
  vm.addRoom = function(e) {
    if (e.keyCode === 13) {
      var nameOfRoomToAdd = vm.nameOfRoomToAdd || 'new room';
      if (vm.rooms.indexOf(nameOfRoomToAdd) === -1) {
        console.log('Adding room ', nameOfRoomToAdd);
        Rooms.addRoom(nameOfRoomToAdd);
        vm.nameOfRoomToAdd = '';
      } else {
        console.log('this room already exists');
      }
    }
  };

});

