angular.module('bizGramFactories', ['firebase'])

.factory('Rooms', ['$firebaseArray', function ($firebaseArray){

	var roomsFactory = {};
	var ref = new Firebase('https://bizgramer.firebaseio.com/hr/rooms');
	var rooms = $firebaseArray(ref);
  var roomNames = [];

	// Create an array to store the room names.
  // Loop through the rooms, and return all the room names.

  //use .$loaded promise to popular roomNames array with async data from firebase
  rooms.$loaded()
    .then(function() {
      angular.forEach(rooms, function (room) {
        roomNames.push(room.$id);
      });
    });

	roomsFactory.getRooms = function(){
		return roomNames;
	};

  var roomName = '';
  roomsFactory.setRoom = function (name){
    roomName = name;
  };

  roomsFactory.getCurrentName = function(){
    return roomName;
  }

  roomsFactory.getRoomMessages = function() {
    var roomRef = ref.child(roomName);
    var messages = $firebaseArray(roomRef);
    return messages;
  };

  roomsFactory.addMessage = function(username, text){
    var roomRef = ref.child(roomName);
    var messages = $firebaseArray(roomRef);
    messages.$add({
      username: username,
      text: text
    });
  };

	return roomsFactory;
}])

.factory('Users', ['$firebaseArray', '$firebaseObject', function ($firebaseArray, $firebaseObject){

	var userFactory = {};
	var ref = new Firebase('https://bizgramer.firebaseio.com/hr/users');
	var users = $firebaseArray(ref);

	// parse the usernames from the database
	userFactory.getUsers = function(){
		return users;
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
	var signout = function(){
		authObj.$unauth();
	};
	return {
    getAuth: getAuth,
    signin: signin,
    signup: signup,
    signout: signout
  };

}]);
