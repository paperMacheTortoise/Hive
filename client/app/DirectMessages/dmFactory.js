angular.module('dmFactory', ['firebase'])

.factory('DirectMessage', ['$firebaseArray', function ($firebaseArray){
	var dmFactory = {};

	// Adds the message to both users' info in database.
	// This allows both users to have a history of the messages when they log in.
	dmFactory.addMessage = function(user1, user2, profileImg, text, org){
		var ref = new Firebase('https://bizgramer.firebaseio.com/'+org+'/directmessages');
		var user1ref = ref.child(user1).child(user2);
		var user2ref = ref.child(user2).child(user1);
		var user1Messages = $firebaseArray(user1ref);
		var user2Messages = $firebaseArray(user2ref);
		user1Messages.$add({
			username: user1,
			img: profileImg || null,
			text: text,
			createdAt: Firebase.ServerValue.TIMESTAMP
		});
		user2Messages.$add({
			username: user1,
			img: profileImg || null,
			text: text,
			createdAt: Firebase.ServerValue.TIMESTAMP
		});
	};

	// Gets direct messages to user2 attached to the current user.
	dmFactory.getDirectMessages = function(user1, user2, org){
    	var dmRef = new Firebase('https://bizgramer.firebaseio.com/'+org+'/directmessages/' + user1 + '/' + user2);
    	var directMessages = $firebaseArray(dmRef);
    	return directMessages;
	};

	return dmFactory;
}]);