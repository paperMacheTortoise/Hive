angular.module('replyFactory', ['firebase'])

.factory('Replies', ['$firebaseArray', function ($firebaseArray) {

  var repliesFactory = {};

  repliesFactory.getReplies = function (index, roomname, org) {
    var url = 'https://bizgramer.firebaseio.com/'+org+'/rooms/' + roomname + '/' + index + '/replies';
    var ref = new Firebase(url);
    var replies = $firebaseArray(ref);
    return replies;
  };

  // adding a reply to message object in firebase
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

  repliesFactory.getVisualReplies = function (index, visualId, org) {
    var ref = new Firebase('https://bizgramer.firebaseio.com/'+org+'/visualizations/' + visualId + '/messages/' + index);
    var replyRef = ref.child('replies');
    var replies = $firebaseArray(replyRef);
    return replies;
  };

  repliesFactory.addVisualReply = function (username, text, index, visualId, org) {
    var ref = new Firebase('https://bizgramer.firebaseio.com/'+org+'/visualizations/' + visualId + '/messages/' + index);
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


