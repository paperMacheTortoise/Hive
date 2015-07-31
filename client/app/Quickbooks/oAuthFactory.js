angular.module('oAuthFactories', ['firebase'])

.factory('oAuth',['$http', function ($http){

  var oauthFactory = {};
  
  // This function makes a get request to the routes to gather quickbooks data and load into the DB.
  oauthFactory.getData = function(org){
    $http.get('/payable',{org:org}).success(function(){
      console.log('Successfully fetched payables data');
    });
    $http.get('/receivable',{org:org}).success(function(){
      console.log('Successfully fetched receivables data');
    });
    $http.get('/customers',{org:org}).success(function(){
      console.log('Successfully fetched customers data');
    });
  };
  
  return oauthFactory;

}]);
