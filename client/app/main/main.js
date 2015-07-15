angular.module('mainCtrl', [])

.controller('mainController', function (Rooms, Users, $rootScope) {

	var vm = this;
	vm.rooms = Rooms.getRooms();
	vm.users = Users.getUsers();
  vm.currentUser = $rootScope.logInfo.username;

	vm.setRoom = function(index){
		Rooms.setRoom(vm.rooms[index]);
	};

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

