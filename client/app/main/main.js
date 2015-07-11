angular.module('mainCtrl', [])

.controller('mainController', function (Rooms, Users) {

	var vm = this;
	vm.rooms = Rooms.getRooms();
	vm.users = Users.getUsers();
});

