angular.module('oAuthFactories', ['firebase'])

.factory('oAuth',['$http', '$firebaseAuth', 'Users', function ($http, $firebaseAuth, $firebaseArray, Users){

  var oauthFactory = {};

  oauthFactory.oAuthIntuit = function($id, org) {
    var users = Users.getUsers(org);
    var index = users.$indexFor($id);
    users.$save(index);
  };
  
  oauthFactory.getData = function(org){
    $http.get('/payable',{org:org}).success(function(){
      console.log('success');
    });
    $http.get('/receivable',{org:org}).success(function(){
      console.log('success');
    });
    $http.get('/customers',{org:org}).success(function(){
      console.log('success');
    });
  };
  return oauthFactory;

}]);
