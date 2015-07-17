angular.module('roomFactory', ['firebase'])

.factory('Rooms', ['$firebaseArray', function ($firebaseArray){

	var roomsFactory = {};

  var getRef = function(org){
  	var ref = new Firebase('https://bizgramer.firebaseio.com/'+org+'/rooms');
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
    return {
      ref: ref,
      rooms: rooms,
      roomNames: roomNames
    };
  };

	roomsFactory.getRooms = function(org){
    var obj =getRef(org);
		return obj.roomNames;
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

  roomsFactory.getRoomMessages = function(org) {
    // var roomRef = ref.child(roomName);
    // var messages = $firebaseArray(roomRef);
    var obj = getRef(org);
    var roomRef = roomName ? obj.ref.child(roomName) : null;
    var messages =  roomRef ? $firebaseArray(roomRef) : null;
    return messages;
  };

  roomsFactory.addMessage = function(username, text, org){
    var obj = getRef(org);
    var roomRef = roomName ? obj.ref.child(roomName) : null;
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

  roomsFactory.addRoom = function (roomname, org) {
    var url = "https://bizgramer.firebaseio.com/"+org+"/rooms/";
    console.log(url);
    var addRoomRef = new Firebase(url);
    addRoomRef.child(roomname).set('this room is empty');
  };

	return roomsFactory;
}]);