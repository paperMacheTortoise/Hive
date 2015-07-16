angular.module('oAuthFactories', ['firebase', 'bizGramFactories'])

.factory('oAuth',['$firebaseAuth',function($firebaseAuth, $firebaseArray, Users){

  var oauthFactory = {};
  // var ref = new Firebase('https://bizgramer.firebaseio.com/');

  // var authObj = $firebaseAuth(ref);

  oauthFactory.oAuthIntuit = function($id) {
    //get $id from $rootScope, look up user
    //put token on user entry
    var users = Users.getUsers();
    var index = users.$indexFor($id);
    // users[index].token;
    // users[index].tokenSecret;
    // users[index].realmId;
    users.$save(index);
  };
  return oauthFactory;

}]);
