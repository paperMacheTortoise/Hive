angular.module('inviteCtrl', ['firebase'])

  .controller('InviteController', function ($state, $firebaseAuth, Auth, Users, $rootScope, $stateParams) {

    var vm = this;

    // when the state changes, set the org property to the current location for routing purpose
    $rootScope.$on('$stateChangeSuccess', function() {
      vm.org = $stateParams.org;
    });

    vm.emailInvite = function () {

    };

  });
