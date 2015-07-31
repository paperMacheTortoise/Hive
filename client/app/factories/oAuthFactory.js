angular.module('oAuthFactories', ['firebase'])

.factory('oAuth',['$http', '$firebaseAuth', 'Users', function ($http, $firebaseAuth, $firebaseArray, Users){

  var oauthFactory = {};

  // This function gets the routes and calls the server side functions that fetches
  // payable, receivable, and customers data from the DB.
  oauthFactory.getData = function(org){

    $http.get('/payable',{org:org}).success(function(){
    });

    $http.get('/receivable',{org:org}).success(function(){
    });

    $http.get('/customers',{org:org}).success(function(){
    });

  };

  return oauthFactory;

}]);
