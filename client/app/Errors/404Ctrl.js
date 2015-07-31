angular.module('404Ctrl', ['firebase'])

  .controller('404Controller', ['$state', '$firebaseAuth', 'Auth', 'Users', '$rootScope', '$stateParams', function ($state, $firebaseAuth, Auth, Users, $rootScope, $stateParams) {

    var vm = this;

    // when the state changes, set the org property to the current location for routing purpose
    $rootScope.$on('$stateChangeSuccess', function() {
      vm.org = $stateParams.org;
    });

    //logout and redirect to landing page
    vm.goToLanding = function() {
      $state.go('landing');
      $rootScope.shouldShow = true;
      $rootScope.logInfo = null;
      Auth.signout();
    };

  }]);
