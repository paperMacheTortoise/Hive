angular.module('visualFactory', ['firebase'])

.factory('Visualization', ['$firebaseArray', function ($firebaseArray){
	
	var visualFactory = {};
	var ref = new Firebase('https://bizgramer.firebaseio.com/hr/visualizations');

	visualFactory.getMessages = function(name){
		var messageRef = ref.child(name).child('messages');
		messages = $firebaseArray(messageRef);
		return messages;
	};

	visualFactory.addMessage = function(user, name, text){
		var messageRef = ref.child(name).child('messages');
		messages = $firebaseArray(messageRef);
		messages.$add({
			username: user,
			text: text,
			createdAt: Firebase.ServerValue.TIMESTAMP
		});
	};

	return visualFactory;
}]);