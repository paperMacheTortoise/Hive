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

	// Returns the list of rooms available.
  roomsFactory.getRooms = function(org){
    var obj = getRef(org);
		return obj.roomNames;
	};

 // Sets the selected room user clicks from Main.
  var roomName = '';
  roomsFactory.setRoom = function (name){
    roomName = name;
  };

  // Returns the current room to the controller.
  roomsFactory.getCurrentName = function(){
    return roomName;
  };

  // Returns the messages for the current room from the db.
  roomsFactory.getRoomMessages = function(roomname, org) {
    var obj = getRef(org);
    var roomRef = obj.ref.child(roomname);
    var messages =  $firebaseArray(roomRef);
      return messages;
  };

  // Adds a message in the room to the db.
  roomsFactory.addMessage = function(username, profileImg, text, roomname, org){
    var obj = getRef(org);
    var roomRef = obj.ref.child(roomname);
    var messages = $firebaseArray(roomRef);
    messages.$add({
      username: username,
      img: profileImg || null,
      text: text,
      createdAt: Firebase.ServerValue.TIMESTAMP
    }).then(function(roomRef) {
      var id = roomRef.key();
      console.log('added a message with id ', id); // eg. -JuDu4oKDL_nl3hBPaOP
      console.log('location in the array ', messages.$indexFor(id)); // eg. 3
    });
  };

  // Adds a new room to the db.
  roomsFactory.addRoom = function (roomname, org) {
    var url = "https://bizgramer.firebaseio.com/"+org+"/rooms/";
    console.log(url);
    var addRoomRef = new Firebase(url);
    addRoomRef.child(roomname).set('this room is empty');
  };

	return roomsFactory;
}]);