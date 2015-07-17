angular.module('mainCtrl', [])

.controller('mainController', function (Rooms, Users, DirectMessage, $rootScope, $stateParams) {

	var vm = this;
  vm.org = $stateParams.org;
  vm.currentUser = $rootScope.logInfo.username;
  vm.rooms = Rooms.getRooms(vm.org);
  vm.users = Users.getDisplayUsers(vm.currentUser, vm.org);

  vm.addRoom = function(e) {
    if (e.keyCode === 13) {
      var nameOfRoomToAdd = vm.nameOfRoomToAdd || 'new room';
      if (vm.rooms.indexOf(nameOfRoomToAdd) === -1) {
        console.log('Adding room ', nameOfRoomToAdd);
        Rooms.addRoom(nameOfRoomToAdd, vm.org);
        vm.nameOfRoomToAdd = '';
      } else {
        console.log('this room already exists');
      }
    }
  };

});

