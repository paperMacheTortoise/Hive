angular.module('mainCtrl', [])

.controller('mainController', function (Rooms, Users) {

	var vm = this;
	vm.rooms = Rooms.getRooms();
	vm.users = Users.getUsers();
	vm.roomName = "General";

	vm.getRoom = function(index){
		vm.roomName = vm.rooms[index].name;
	};
});

