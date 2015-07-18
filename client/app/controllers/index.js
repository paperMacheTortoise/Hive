angular.module('indexCtrl', ['firebase', ])

  .controller('IndexController', function ($state, $firebaseAuth, Auth, Users, $rootScope, $stateParams) {

    var vm = this;

    // when the state changes, set the org property to the current location for routing purpose
    $rootScope.$on('$stateChangeSuccess', function() {
      vm.org = $stateParams.org;
    });

    vm.logout = function () {
      $rootScope.logInfo = null;
      Auth.signout();
    };

  });
