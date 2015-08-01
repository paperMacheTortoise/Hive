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
        OrgSignup.signupOrg(vm.nameOfOrgToAdd, vm.nameOfCreator, vm.emailOfCreator, vm.passwordOfCreator, function(vm, orgname){
          // redirect to user login/signup page of this new org

          $state.go('main.room', {org: orgname, roomName:'General'});
        },vm);
        // empty input field
        vm.nameOfOrgToAdd = '';
      } else {
        vm.addAlert('Organization with this name already exists!');
      }
    };

    vm.redirect = function () {
      if (vm.orgnames.indexOf(vm.nameOfOrgToGo) === -1) {
        vm.addAlert('Organization does not exist!');
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
