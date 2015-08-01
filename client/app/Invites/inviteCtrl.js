// angular controller for existing users to send email invitation to join their organization
angular.module('inviteCtrl', ['firebase'])

.controller('InviteController', ['$state', '$firebaseAuth', 'Auth', 'Users', '$rootScope', '$stateParams', 'invite', '$modalInstance', '$scope', function ($state, $firebaseAuth, Auth, Users, $rootScope, $stateParams, invite, $modalInstance, $scope) {


  // get the org name to pass to emailInvite function
  $scope.org = $stateParams.org;
  // get the current logged in username
  $scope.thisUser = $rootScope.logInfo.username;
  $scope.emailInvite = function () {
    // call the factory function to make ajax call to Mandrill API to send email invitation
    invite.sendEmailInvitation($scope.thisUser, $scope.org, $scope.inviteeName, $scope.inviteeEmail);
    // empty the input fields
    $scope.inviteeEmail = '';
    $scope.inviteeName = '';
  };

  $scope.ok = function(){
    $modalInstance.close('ok');
  };

  $scope.cancel = function() {
    $modalInstance.dismiss('cancel');
  };
}]);
