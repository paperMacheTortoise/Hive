angular.module('orgsignupCtrl', ['firebase','ui.bootstrap'])

  .controller('OrgsignupController', ['OrgSignup', '$state', 'LinkedinAuth', function (OrgSignup, $state, LinkedinAuth) {

    var vm = this;
    // call orgsignup factory to get all the names of the organizations already signed up
    vm.orgnames = OrgSignup.getOrgs();
    vm.alerts = [];
    vm.addAlert = function(message) {
      vm.alerts.pop();
      vm.alerts.push({type:'danger',msg: message});
    };
    vm.closeAlert = function() {
      vm.alerts.pop();
    };
    // sign up a new organization
    vm.signupOrg = function () {
      // convert to lower case to avoid similar names being created
      vm.nameOfOrgToAdd = vm.nameOfOrgToAdd.toLowerCase();
      // if this org name is not already used
      if (vm.orgnames.indexOf(vm.nameOfOrgToAdd) === -1) {
        // call the orgsignup factory function to add a new org to the firebase db
        OrgSignup.signupOrg(vm.nameOfOrgToAdd, vm.nameOfCreator, vm.emailOfCreator, vm.passwordOfCreator, function(){
          // redirect to user login/signup page of this new org
          $state.go('main', {org: vm.nameOfOrgToAdd});

        });
        // empty input field
        vm.nameOfOrgToAdd = '';
      } else {
        vm.addAlert('Organization with this name already exists!');
        console.log('org with this name already exists');
        // $state.go('signin', {org: vm.nameOfOrgToAdd});
      }
    };

    vm.redirect = function () {
      if (vm.orgnames.indexOf(vm.nameOfOrgToGo) === -1) {
        vm.addAlert('Organization does not exist!');
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
  }]);
