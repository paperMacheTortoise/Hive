angular.module('orgsignupCtrl', ['firebase'])

  .controller('OrgsignupController', function (OrgSignup, $state, LinkedinAuth) {

    var vm = this;
    vm.orgnames = OrgSignup.getOrgs();

    vm.signupOrg = function () {
      vm.nameOfOrgToAdd = vm.nameOfOrgToAdd.toLowerCase();
      if (vm.orgnames.indexOf(vm.nameOfOrgToAdd) === -1) {
        OrgSignup.signupOrg(vm.nameOfOrgToAdd, vm.nameOfCreator, vm.emailOfCreator);
        $state.go('signup', {org: vm.nameOfOrgToAdd});
        vm.nameOfOrgToAdd = '';
      } else {
        console.log('org with this name already exists');
        $state.go('signin', {org: vm.nameOfOrgToAdd});
      }
    };

    vm.redirect = function () {
      if (vm.orgnames.indexOf(vm.nameOfOrgToGo) === -1) {
        console.log('go sign up for new org');
        vm.nameOfOrgToGo = '';
      } else {
        vm.setOrg(vm.nameOfOrgToGo);
        $state.go('signin', {org: vm.nameOfOrgToGo});
      }
    };


    // Sends org as POST request to server for oAuth
    vm.setOrg = function(org){
      LinkedinAuth.setOrg(org);
    };
  });
