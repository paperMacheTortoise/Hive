angular.module('authFactory', ['firebase'])

.factory('Auth', ['$firebaseAuth', '$firebaseArray', function ($firebaseAuth, $firebaseArray){

	var authFactory = {};
	var ref = new Firebase('https://bizgramer.firebaseio.com/');

	var authObj = $firebaseAuth(ref);
  authFactory.getAuth= function(callback){
    var authData = authObj.$getAuth();
    console.log(authData);
    callback(authData);
  };

  authFactory.signin = function(email,password,callback){
    authObj.$authWithPassword({
        email: email,
        password: password
      }).then(function(authData){
      data = authData;
      console.log('logged in as '+authData.uid);
      callback(data);
    }).catch(function(error){
      console.log('Error:',error);
    });
  };

  authFactory.signup = function(email, password, orgId, orgName, callback, vm){
    var orgRef = new Firebase('https://bizgramer.firebaseio.com/'+orgName)
    var orgArr = $firebaseArray(orgRef);
    orgArr.$loaded()
      .then(function() {
        if(orgArr.$getRecord('orgKey')['$value'] === orgId) {
          authObj.$createUser({
            email: email,
            password: password
          }).then(function(userData){
            console.log("User " + userData.uid + " created successfully!");
            authFactory.signin(email,password,callback,vm);
          }).catch(function(error){
            console.log('Error:',error);
          });
        } else {
          console.log('incorrect Id for ', orgName);
        }
      })
      .catch(function (error) {
        console.log('error', error);
      });
	};

	authFactory.signout = function(){
		authObj.$unauth();
	};

	return authFactory;
}]);
