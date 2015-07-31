// angular controller for app main view
angular.module('mainCtrl', [])

.controller('mainController', function (Rooms, Users, DirectMessage, Visualization, $rootScope, $stateParams, oAuth) {

	var vm = this;
  // make sure the currentUser is the logged in user
  vm.currentUser = null;
  vm.org = $stateParams.org;
  if ($rootScope && $rootScope.logInfo) {
    vm.currentUser = $rootScope.logInfo.username;
  }

  // Get the rooms from the roomFactory.
  vm.rooms = Rooms.getRooms(vm.org);
  // Get all users except for the current user from the userFactory.
  vm.users = Users.getDisplayUsers(vm.currentUser, vm.org);

  // Adding a new chat room to the organization
  vm.addRoom = function(e) {
    // check for enter key-up
    if (e.keyCode === 13) {
      var nameOfRoomToAdd = vm.nameOfRoomToAdd;
      // if the room doesn't already exist
      if (vm.rooms.indexOf(nameOfRoomToAdd) === -1) {
        // call the main factory function to add room
        Rooms.addRoom(nameOfRoomToAdd, vm.org);
        // empty the input field
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

