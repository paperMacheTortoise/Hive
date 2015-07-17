angular.module('dmFactory', ['firebase'])

.factory('DirectMessage', ['$firebaseArray', function ($firebaseArray){
	var dmFactory = {};
	var ref = new Firebase('https://bizgramer.firebaseio.com/hr/directmessages');

	// adds the message to both users' info in database
	dmFactory.addMessage = function(user1, user2, text){
		var user1ref = ref.child(user1).child(user2);
		var user2ref = ref.child(user2).child(user1);
		var user1Messages = $firebaseArray(user1ref);
		var user2Messages = $firebaseArray(user2ref);
		user1Messages.$add({
			username: user1,
			text: text,
			createdAt: Firebase.ServerValue.TIMESTAMP
		});
		user2Messages.$add({
			username: user1,
			text: text,
			createdAt: Firebase.ServerValue.TIMESTAMP
		});
	};

	// gets direct messages attached to current user
	dmFactory.getDirectMessages = function(user1, user2){
    	var dmRef = new Firebase('https://bizgramer.firebaseio.com/hr/directmessages/' + user1 + '/' + user2);
    	var directMessages = $firebaseArray(dmRef);
    	console.log(directMessages);
    	return directMessages;
	};

	return dmFactory;
}]);