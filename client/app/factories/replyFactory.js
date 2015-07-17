angular.module('replyFactory', ['firebase'])

.factory('Replies', ['$firebaseArray', function ($firebaseArray) {

  var repliesFactory = {};

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
      text: text,
      createdAt: Firebase.ServerValue.TIMESTAMP
    });
  };

  repliesFactory.getVisualReplies = function (index, visualId) {
    var ref = new Firebase('https://bizgramer.firebaseio.com/hr/visualizations/' + visualId + '/messages/' + index);
    var replyRef = ref.child('replies');
    var replies = $firebaseArray(replyRef);
    return replies;
  };

  repliesFactory.addVisualReply = function (username, text, index, visualId) {
    var ref = new Firebase('https://bizgramer.firebaseio.com/hr/visualizations/' + visualId + '/messages/' + index);
    var replyRef = ref.child('replies');
    var replies = $firebaseArray(replyRef);
    replies.$add({
      username: username,
      text: text,
      createdAt: Firebase.ServerValue.TIMESTAMP
    });
  };

  return repliesFactory;
}]);


