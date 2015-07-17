angular.module('indexCtrl', ['firebase', ])

  .controller('IndexController', function ($state, $firebaseAuth, Auth, Users, $rootScope, $stateParams) {

    var vm = this;
    vm.org = $stateParams.org;

    vm.logout = function () {
      $rootScope.logInfo = null;
      Auth.signout();
    };

  });
