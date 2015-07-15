angular.module('mainCtrl', [])

.controller('mainController', function (Rooms, Users, $rootScope, $state) {

	var vm = this;
	vm.rooms = Rooms.getRooms();
	vm.users = Users.getUsers();

	vm.setRoom = function(index){
		Rooms.setRoom(vm.rooms[index]);
	};
});

