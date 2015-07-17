angular.module('userFactory', ['firebase'])

.factory('Users', ['$firebaseArray', function ($firebaseArray){

	var userFactory = {};
	var ref = new Firebase('https://bizgramer.firebaseio.com/hr/users');
  var users = $firebaseArray(ref);

	// parse the usernames from the database
  userFactory.getUsers = function(){
    return users;
  };

	// display all the usernames in the main menu except for the current user,
  // so that the user cannot dm themselves
  userFactory.getDisplayUsers = function(current){
    var updatedUsers = [];
    users.$loaded()
    .then(function(){
      angular.forEach(users, function (user){
        if(user.username !== current){
          updatedUsers.push(user);
        }
      });
    });
		return updatedUsers;
	};

  userFactory.getUserPictures = function(key){
    var pictureRef = new Firebase('https://bizgramer.firebaseio.com/hr/users/'+key+'/pictureCollection');
    var pictures = $firebaseArray(pictureRef);
    return pictures;
  };

  // CHECK IF NECESSARY
  // These methods allow the user to select a username from the main menu
  // and send that user a direct message
  var username = '';
  userFactory.setUsername = function(user){
    username = user;
  };

  userFactory.getUsername = function(){
    return username;
  };

	return userFactory;
}]);