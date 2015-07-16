angular.module('orgsignupCtrl', ['firebase'])

  .controller('OrgsignupController', function (OrgSignup) {

    var vm = this;
    vm.orgnames = OrgSignup.getOrgs();
    console.log(vm.orgnames);

    vm.signupOrg = function () {
      if (vm.orgnames.indexOf(vm.nameOfOrgToAdd) === -1) {
        console.log('adding new room :', vm.nameOfOrgToAdd);
        OrgSignup.signupOrg(vm.nameOfOrgToAdd);
        vm.nameOfOrgToAdd = '';
      } else {
        console.log('org with this name already exists');
      }
    };

  });
