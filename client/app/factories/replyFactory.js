angular.module('replyFactory', ['firebase'])

.factory('Replies', ['$firebaseArray', function ($firebaseArray) {

  var repliesFactory = {};

  // Gets the replies for the current message from the db.
  repliesFactory.getReplies = function (index, roomname, org) {
    var url = 'https://bizgramer.firebaseio.com/'+org+'/rooms/' + roomname + '/' + index + '/replies';
    var ref = new Firebase(url);
    var replies = $firebaseArray(ref);
    return replies;
  };

  // Adds the reply message to replies of the current message in the db. 
  repliesFactory.addReply = function (username, text, index, roomname, org) {
    var url = 'https://bizgramer.firebaseio.com/'+org+'/rooms/' + roomname + '/' + index + '/replies';
    console.log('url ', url);
    var ref = new Firebase(url);
    var replies = $firebaseArray(ref);
    replies.$add({
      username: username,
      text: text,
      createdAt: Firebase.ServerValue.TIMESTAMP
    });
  };

  // Gets the reply messages for the current message from the db.
  repliesFactory.getVisualReplies = function (index, org) {
    var ref = new Firebase('https://bizgramer.firebaseio.com/'+org+'/visualizations/messages/' + index);
    var replyRef = ref.child('replies');
    var replies = $firebaseArray(replyRef);
    return replies;
  };

  // Adds a reply to the current message in the db.
  repliesFactory.addVisualReply = function (username, text, index, org) {
    var ref = new Firebase('https://bizgramer.firebaseio.com/'+org+'/visualizations/messages/' + index);
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


