angular.module('bizGramFactories', ['firebase'])

.factory('Rooms', ['$firebaseArray', function ($firebaseArray){

	var ref = new Firebase ('https://bizgramer.firebaseio.com/hr/messages');
	var messages = $firebaseArray(ref);

	// create a rooms object to store the room names. Loop through the messages,
	// and return all the room names. Storing the rooms in an object will automatically
	// remove any duplicate room names.
	var getRooms = function(){
		var rooms = {};
		for(var i = 0; i < messages.length; i++){
			rooms[messages[i].room] = null;
		}

		// Return the room names in an array;
		return Object.keys(rooms);
	}

	return {
		getRooms: getRooms
	};
}])

.factory('Users', ['$firebaseArray', function ($firebaseArray){

	var ref = new Firebase ('https://bizgramer.firebaseio.com/hr/users');
	var users = $firebaseArray(ref);

	// parse the usernames from the database
	var getUsers = function(){
		var usernames = [];
		for(var i = 0; i < users.length; i++){
			usernames.push(users[i].username);
		}

		// Return the usernames in an array
		return usernames;
	}

	return {
		getUsers: getUsers
	};
}])
