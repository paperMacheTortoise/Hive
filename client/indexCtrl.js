angular.module('indexCtrl', ['firebase', ])

  .controller('IndexController', ['$state', '$firebaseAuth', 'Auth', 'Users', '$rootScope', '$stateParams', function ($state, $firebaseAuth, Auth, Users, $rootScope, $stateParams) {

    var vm = this;

    // when the state changes, set the org property to the current location for routing purpose
    $rootScope.$on('$stateChangeSuccess', function() {
      vm.org = $stateParams.org;
    });

    // when user click on bizGram logo on top left corner
    vm.logo = function() {
      // if the user is logged in, redirect to the org main page
      if ($rootScope.logInfo) {
        $state.go('main.room', {org: vm.org, roomName:'General'});
      // otherwise redirect to landing page
      } else {
        $state.go('landing');
      }
    };

    vm.logout = function () {
      $rootScope.logInfo = null;
      Auth.signout();
      $state.go('landing');
    };

  }]);
