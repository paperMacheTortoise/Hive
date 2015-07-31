angular.module('directMessageCtrl', [])

.controller('directMessageController',['DirectMessage', 'Users', '$rootScope', '$stateParams', 'Auth', function (DirectMessage, Users, $rootScope, $stateParams, Auth){

  var vm = this;
  // Passes the user from the main view to the directmessage view.
  vm.org = $stateParams.org;
  vm.recipient = $stateParams.user;
  
  // Tracks the user currently logged-in.
  if(!$rootScope.logInfo){
    Auth.refreshUser(function(logInfo){
      $rootScope.logInfo = logInfo;
      vm.currentUser = $rootScope.logInfo;
      vm.messages = DirectMessage.getDirectMessages(vm.currentUser.username, vm.recipient, vm.org);
    });
  } else {
    vm.currentUser = $rootScope.logInfo;
    vm.messages = DirectMessage.getDirectMessages(vm.currentUser.username, vm.recipient, vm.org);
  }

  // Retrieves the messages for this user from the db.
  Users.setUsername(vm.recipient); // CHECK IF NECESSARY

  // Sends the message from the current user to the dmFactory.
  vm.addMessage = function(e){
    if (e.keyCode === 13) {
      console.log(vm.currentUser, vm.recipient, vm.text);
      DirectMessage.addMessage(vm.currentUser.username, vm.recipient, vm.currentUser.pictureUrl, vm.text, vm.org);
      vm.text = '';
    }
  };
}]);
