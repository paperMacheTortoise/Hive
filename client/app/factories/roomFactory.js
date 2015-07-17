angular.module('roomFactory', ['firebase'])

.factory('Rooms', ['$firebaseArray', function ($firebaseArray){

	var roomsFactory = {};
  // Make a ref to db for all rooms.
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

	// Returns all the rooms available.
  roomsFactory.getRooms = function(){
		return roomNames;
	};

 // Sets the selected room user clicks from Main.
  var roomName = '';
  roomsFactory.setRoom = function (name){
    roomName = name;
  };

  // Returns the current room.
  roomsFactory.getCurrentName = function(){
    return roomName;
  };

  // Gets the messages for room.
  roomsFactory.getRoomMessages = function() {
    var roomRef = roomName ? ref.child(roomName) : null;
    var messages =  roomRef ? $firebaseArray(roomRef) : null;
    return messages;
  };

  // Add message to room.
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