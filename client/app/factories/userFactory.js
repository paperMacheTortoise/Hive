angular.module('userFactory', ['firebase'])

.factory('Users', ['$firebaseArray', function ($firebaseArray){

	var userFactory = {};
  var fire = function(org){

    var ref = new Firebase('https://bizgramer.firebaseio.com/'+org+'/users');
    var users = $firebaseArray(ref);
    return {
      ref:ref,
      users:users
    };
  };

	// parse the usernames from the database
  userFactory.getUsers = function(org){
    return fire(org).users;
  };

	// display all the usernames in the main menu except for the current user
  userFactory.getDisplayUsers = function(current,org){
    //firebase array object from fire()
    var farray = fire(org);
    var updatedUsers = [];
    farray.users.$loaded()
    .then(function(){
      angular.forEach(farray.users, function (user){
        if(user.username !== current){
          updatedUsers.push(user);
        }
      });
    });
		return updatedUsers;
	};

  userFactory.getUserPictures = function(key,org){
    var pictureRef = new Firebase('https://bizgramer.firebaseio.com/'+org+'/users/'+key+'/pictureCollection');
    var pictures = $firebaseArray(pictureRef);
    return pictures;
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

	return userFactory;
}]);