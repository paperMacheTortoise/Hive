angular.module('mainCtrl', [])

.controller('mainController', function (Rooms, Users) {

	var vm = this;
		vm.rooms = Rooms.getRooms();
		vm.users = Users.getUsers();

	vm.getUsers = function(){
		Users.getUsers()
			.then(function(users){
				vm.users =  users;
			});
	};
	vm.getUsers();

});
