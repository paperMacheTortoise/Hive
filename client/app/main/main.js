angular.module('MainCtrl' ['firebase'])

.controller('mainController', function (Rooms, Users)){

	var vm = this;
	vm.rooms;
	vm.users;

	vm.getRooms = function(){
		Rooms.getRooms()
			.then(function(rooms){
				vm.rooms = rooms;
			});
	};
	vm.getRooms();


	vm.getUsers = function(){
		Users.getUsers()
			.then(function(users){
				vm.users =  users;	
			});
	};
	vm.getUsers();

]})