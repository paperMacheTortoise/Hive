angular.module('bizGramFactories', ['firebase'])

.factory('Rooms', ['$firebaseArray', '$firebaseObject', function ($firebaseArray, $firebaseObject){

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
    // var roomRef = ref.child(roomName);
    // var messages = $firebaseArray(roomRef);
    // messages.$add({
      // username: username,
      // text: text
    // });
    var roomRef = roomName ? ref.child(roomName) : null;
    var messages = roomRef ? $firebaseArray(roomRef) : null;
    messages.$add({
      username: username,
      text: text
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
}])

.factory('Replies', ['$firebaseArray', function ($firebaseArray) {

  var repliesFactory = {};
  var ref = new Firebase('https://bizgramer.firebaseio.com/hr/rooms/');
  var replies = $firebaseArray(ref);
  var repliesArr = [];

  repliesFactory.getReplies = function (index, roomname) {
    var url = 'https://bizgramer.firebaseio.com/hr/rooms/' + roomname + '/' + index + '/replies';
    var ref = new Firebase(url);
    var replies = $firebaseArray(ref);
    return replies;
  };

  // adding a reply to message object in firebase
  repliesFactory.addReply = function (username, text, index, roomname) {
    var url = 'https://bizgramer.firebaseio.com/hr/rooms/' + roomname + '/' + index + '/replies';
    console.log('url ', url);
    var ref = new Firebase(url);
    var replies = $firebaseArray(ref);
    replies.$add({
      username: username,
      text: text
    });
  };

  return repliesFactory;
}])


.factory('Upload',['$firebaseArray', function ($firebaseArray){
  var uploadFactory={};
	AWS.config.update({accessKeyId: 'AKIAIVEO6DBRV7OF7YDA', secretAccessKey: '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'});
	AWS.config.region = 'us-west-2';
	var s3 = new AWS.S3({params:{Bucket:'bizgram'}});
  uploadFactory.putFile = function(body, name, callback){
    s3.upload({
      Body: body,
      Key: 'images/'+name,
      ACL: "public-read-write"
    },function(err,data){
      if(err){
        console.log(err);
      }
      else{
        console.log(data);
        callback('https://drgvq3mghnaxi.cloudfront.net/images/'+name);
      }
    });
  };
  return uploadFactory;
}])

.factory('Users', ['$firebaseArray', '$firebaseObject', function ($firebaseArray, $firebaseObject){

	var userFactory = {};
	var ref = new Firebase('https://bizgramer.firebaseio.com/hr/users');
	var users = $firebaseArray(ref);

	// parse the usernames from the database
	userFactory.getUsers = function(){
		return users;
	};

  // These methods allow the user to select a username from the main menu
  // and send that user a direct message
  var username = '';
  userFactory.setUsername = function(user){
    username = user;
  };

  userFactory.getUsername = function(){
    return username;
  };

  userFactory.getUserPictures = function(key){
    var pictureRef = new Firebase('https://bizgramer.firebaseio.com/hr/users/'+key+'/pictureCollection');
    var pictures = $firebaseArray(pictureRef);
    return pictures;
  };

	return userFactory;
}]);

