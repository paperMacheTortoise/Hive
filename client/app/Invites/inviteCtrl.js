// angular controller for existing users to send email invitation to join their organization
angular.module('inviteCtrl', ['firebase'])

  .controller('InviteController', function ($state, $firebaseAuth, Auth, Users, $rootScope, $stateParams, invite) {

    var vm = this;
    // get the org name to pass to emailInvite function
    vm.org = $stateParams.org;
    // get the current logged in username
    vm.thisUser = $rootScope.logInfo.username;
    vm.emailInvite = function () {
      // call the factory function to make ajax call to Mandrill API to send email invitation
      invite.sendEmailInvitation(vm.thisUser, vm.org, vm.inviteeName, vm.inviteeEmail);
      // empty the input fields
      vm.inviteeEmail = '';
      vm.inviteeName = '';
    };

  });
