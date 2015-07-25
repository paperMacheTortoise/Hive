angular.module('orgsignupCtrl', ['firebase'])

  .controller('OrgsignupController', function (OrgSignup, $state) {

    var vm = this;
    vm.orgnames = OrgSignup.getOrgs();

    vm.signupOrg = function () {
      if (vm.orgnames.indexOf(vm.nameOfOrgToAdd) === -1) {
        console.log('adding new room :', vm.nameOfOrgToAdd);
        OrgSignup.signupOrg(vm.nameOfOrgToAdd, vm.nameOfCreator, vm.emailOfCreator);
        console.log(vm.nameOfOrgToAdd);
        $state.go('signin', {org: vm.nameOfOrgToAdd});
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
        $state.go('signin', {org: vm.nameOfOrgToGo});
      }
    };


  });
