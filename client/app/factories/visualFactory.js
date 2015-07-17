angular.module('visualFactory', ['firebase'])

.factory('Visualization', ['$firebaseArray', function ($firebaseArray){
	
	var visualFactory = {};

	visualFactory.getMessages = function(name, org){
		var ref = new Firebase('https://bizgramer.firebaseio.com/'+org+'/visualizations');
		var messageRef = ref.child(name).child('messages');
		messages = $firebaseArray(messageRef);
		return messages;
	};

	visualFactory.addMessage = function(user, name, text){
		var ref = new Firebase('https://bizgramer.firebaseio.com/'+org+'/visualizations');
		var messageRef = ref.child(name).child('messages');
		messages = $firebaseArray(messageRef);
		messages.$add({
			username: user,
			text: text
		});
	};

	return visualFactory;
}]);