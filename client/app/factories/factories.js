angular.module('bizGramFactories', ['firebase'])

.factory('Rooms', ['$firebaseArray', function ($firebaseArray){

	var roomsFactory = {};
	var ref = new Firebase('https://bizgramer.firebaseio.com/hr/messages');
	var messages = $firebaseArray(ref);

	// create a rooms object to store the room names. Loop through the messages,
	// and return all the room names. Storing the rooms in an object will automatically
	// remove any duplicate room names.
	roomsFactory.getRooms = function(){
		var rooms = {};
		for(var i = 0; i < messages.length; i++){
			rooms[messages[i].room] = null;
		}

		// Return the room names in an array;
		return Object.keys(rooms);
	};

	return roomsFactory;
}])

.factory('Users', ['$firebaseArray', function ($firebaseArray){


	var userFactory = {};
	var ref = new Firebase('https://bizgramer.firebaseio.com/hr/users');
	var users = $firebaseArray(ref);

	// parse the usernames from the database
	userFactory.getUsers = function(){
		debugger;
		console.log(users);
		var usernames = [];
		for(var i = 0; i < users.length; i++){
			usernames.push(users[i].username);
		}

		// Return the usernames in an array
		return usernames;
	};

	return userFactory;
}])

.factory('Auth',['$firebaseAuth',function($firebaseAuth){
	
	var authFactory = {};
	var ref = new Firebase('https://bizgramer.firebaseio.com/');

	var authObj = $firebaseAuth(ref);
	var getAuth= function(callback){
		var authData = authObj.$getAuth();
		console.log(authData);
		callback(authData);
	};
  var signin = function(email,password,callback,vm){
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
	var signup = function(email,password, callback, vm){
    var data = null;
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
	return {
    getAuth: getAuth,
    signin: signin,
    signup: signup
  };

}]);
