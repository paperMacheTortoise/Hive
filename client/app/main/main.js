angular.module('mainCtrl', [])

.controller('mainController', function (Rooms, Users, $rootScope, $state) {
	var vm = this;
	vm.rooms = Rooms.getRooms();
	vm.users = Users.getUsers();
	vm.roomName = "General";

	vm.getRoom = function(index){
		console.log('getRoom called');
		vm.roomName = vm.rooms[index];
		Rooms.setRoom(vm.roomName);
	};
});

