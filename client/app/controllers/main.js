angular.module('mainCtrl', [])

.controller('mainController', function (Rooms, Users, DirectMessage, Visualization, $rootScope, $stateParams, oAuth) {

	var vm = this;
  // console.log('main', $stateParams);
  // console.log('rootScope', $rootScope.logInfo);
  vm.currentUser = null;
  vm.org = $stateParams.org;
  if ($rootScope && $rootScope.logInfo) {
    vm.currentUser = $rootScope.logInfo.username;
  }

  // Get the rooms from the roomFactory.
  vm.rooms = Rooms.getRooms(vm.org);
  // Get all users except for the current user from the userFactory.
  vm.users = Users.getDisplayUsers(vm.currentUser, vm.org);

  // Send new room to the roomFactory.
  vm.addRoom = function(e) {
    if (e.keyCode === 13) {
      var nameOfRoomToAdd = vm.nameOfRoomToAdd || 'new room';
      if (vm.rooms.indexOf(nameOfRoomToAdd) === -1) {
        // console.log('Adding room ', nameOfRoomToAdd);
        Rooms.addRoom(nameOfRoomToAdd, vm.org);
        vm.nameOfRoomToAdd = '';
        // update the list of chatrooms
        vm.rooms = Rooms.getRooms(vm.org);
      } else {
        console.log('this room already exists');
      }
    }
  };
  vm.getQBO = function(){
    oAuth.getData(vm.org);
  };
});

