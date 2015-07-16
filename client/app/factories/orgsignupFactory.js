angular.module('orgsignupFactory', ['firebase'])

.factory('OrgSignup', ['$firebaseArray', function ($firebaseArray) {

  var orgsignupFactory = {};
  var ref = new Firebase('https://bizgramer.firebaseio.com/');
  var organizations = $firebaseArray(ref);
  var orgNames = [];

  organizations.$loaded()
    .then(function () {
      angular.forEach(organizations, function (org) {
        orgNames.push(org.$id);
      });
      console.log(orgNames);
    });

}]);
