angular.module('inviteCtrl', ['firebase'])

  .controller('InviteController', function ($state, $firebaseAuth, Auth, Users, $rootScope, $stateParams, invite) {

    var vm = this;
    // get the org name to pass to emailInvite function
    vm.org = $stateParams.org;
    vm.thisUser = $rootScope.logInfo.username;
    vm.emailInvite = function () {
      // call the factory function to make ajax call to Mandrill API
      invite.sendEmailInvitation(vm.thisUser, vm.org, vm.inviteeName, vm.inviteeEmail);
      // empty the input fields
      vm.inviteeEmail = '';
      vm.inviteeName = '';
    };

  });
