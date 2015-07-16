angular.module('authFactory', ['firebase'])

.factory('Auth', ['$firebaseAuth', function ($firebaseAuth, $rootScope){

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

	authFactory.signup = function(email,password, callback, vm){
    // var data = null;
    authObj.$createUser({
      email: email,
      password: password
    }).then(function(userData){
      console.log("User " + userData.uid + " created successfully!");
      signin(email,password,callback,vm);
    }).catch(function(error){
      console.log('Error:',error);
    });
	};

	authFactory.signout = function(){
		authObj.$unauth();
	};

	return authFactory;
}]);
