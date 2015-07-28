angular.module('oAuthFactories', ['firebase'])

.factory('oAuth',['$http', '$firebaseAuth', 'Users', function ($http, $firebaseAuth, $firebaseArray, Users){

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
  oauthFactory.getData = function(org){
    $http.get('/payable',{org:org}).success(function(data){
      console.log('success');
    });
    $http.get('/receivable',{org:org}).success(function(data){
      console.log('success');
    });
    $http.get('/receivable',{org:org}).success(function(data){
      console.log('success');
    });
  };
  return oauthFactory;

}]);
