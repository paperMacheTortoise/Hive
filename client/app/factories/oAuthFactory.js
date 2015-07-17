angular.module('oAuthFactories', ['firebase'])

.factory('oAuth',['$firebaseAuth', 'Users', function ($firebaseAuth, $firebaseArray, Users){

  var oauthFactory = {};
  // var ref = new Firebase('https://bizgramer.firebaseio.com/');

  // var authObj = $firebaseAuth(ref);
  oauthFactory.oAuthIntuit = function($id, org) {
    //get $id from $rootScope, look up user
    //put token on user entry
    var users = Users.getUsers(org);
    var index = users.$indexFor($id);
    // users[index].token;
    // users[index].tokenSecret;
    // users[index].realmId;
    users.$save(index);
  };
  return oauthFactory;

}]);
