// angular controller for app main view
angular.module('mainCtrl', ['ui.bootstrap'])

.controller('mainController', ['Rooms', 'Users', 'DirectMessage', 'Visualization', '$rootScope', '$stateParams', 'oAuth', '$interval', function (Rooms, Users, DirectMessage, Visualization, $rootScope, $stateParams, oAuth, $interval) {

  var vm = this;
  // make sure the currentUser is the logged in user
  vm.currentUser = null;
  vm.profileUrl = null;
  vm.dyno = 0;
  vm.progress = false;
  vm.org = $stateParams.org;
  if ($rootScope && $rootScope.logInfo) {
    vm.currentUser = $rootScope.logInfo.username;
    vm.profileUrl = $rootScope.logInfo.pictureUrl;
  }

  // Get the rooms from the roomFactory.
  vm.rooms = Rooms.getRooms(vm.org);
  // Get all users except for the current user from the userFactory.
  vm.users = Users.getDisplayUsers(vm.currentUser, vm.org);
  var increaseDyno = function(){
    if(vm.dyno === 15){
      vm.progress = false;
      vm.dyno = 0;
    }
    else if(vm.dyno <= 15){
      vm.dyno++;
    }
  };
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
    vm.progress = true;
    oAuth.getData(vm.org);
    $interval(increaseDyno, 100, 16);
  };
}]);

