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
		for(var key in messages){
			rooms[messages[key].room] = null;
		}

		// Return the room names in an array;
		return Object.keys(rooms);
	};

	return roomsFactory;
}])

.factory('Users', ['$firebaseArray', '$firebaseObject', function ($firebaseArray, $firebaseObject){

	var userFactory = {};
	var ref = new Firebase('https://bizgramer.firebaseio.com/hr');
	var userRef = ref.child('users');
	console.log(ref);
	// console.log(userRef);
	var usersArr = $firebaseArray(userRef);
	var usersObj = $firebaseObject(userRef);

	// parse the usernames from the database
	userFactory.getUsers = function(){
		console.log(usersObj);
		// debugger;
		var usernames = [];
		for(var key in usersArr){
			usernames.push(usersArr[key].username);
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
