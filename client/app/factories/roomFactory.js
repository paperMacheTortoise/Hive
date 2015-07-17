angular.module('roomFactory', ['firebase'])

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
  };

  roomsFactory.getRoomMessages = function() {
    // var roomRef = ref.child(roomName);
    // var messages = $firebaseArray(roomRef);
    var roomRef = roomName ? ref.child(roomName) : null;
    var messages =  roomRef ? $firebaseArray(roomRef) : null;
    return messages;
  };

  roomsFactory.addMessage = function(username, text){
    var roomRef = roomName ? ref.child(roomName) : null;
    var messages = roomRef ? $firebaseArray(roomRef) : null;
    messages.$add({
      username: username,
      text: text,
      createdAt: Firebase.ServerValue.TIMESTAMP
    }).then(function(roomRef) {
      var id = roomRef.key();
      console.log('added a message with id ', id); // eg. -JuDu4oKDL_nl3hBPaOP
      console.log('location in the array ', messages.$indexFor(id)); // eg. 3
    });
  };

  roomsFactory.addRoom = function (roomname) {
    var url = "https://bizgramer.firebaseio.com/hr/rooms/";
    console.log(url);
    var addRoomRef = new Firebase(url);
    addRoomRef.child(roomname).set('this room is empty');
  };

	return roomsFactory;
}]);