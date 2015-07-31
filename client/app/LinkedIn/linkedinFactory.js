angular.module('linkedinFactory', [])

.factory('LinkedinAuth', [ '$http', function ($http){
  
  var linkedinFactory = {};

  linkedinFactory.setFBInfo = function(org, uid){
    console.log('SetFBInfo', uid);
    return $http({
      method: 'POST',
      url: '/setFBInfo',
      data: {'org' : org, 'user': uid}
    })
      .then(function(resp){
        return resp;
      });
  };

  linkedinFactory.setOrg = function(org){
    return $http({
      method: 'POST',
      url: '/setOrg',
      data: {'org' : org}
    })
      .then(function(resp){
        return resp;
      });
  };

  return linkedinFactory;
}]);