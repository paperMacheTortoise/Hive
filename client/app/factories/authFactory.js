angular.module('authFactory', ['firebase'])

.factory('Auth', ['$firebaseAuth', '$firebaseArray', '$state', '$rootScope', 'Users', '$stateParams', function ($firebaseAuth, $firebaseArray, $state, $rootScope, Users, $stateParams){

	var authFactory = {};
	var ref = new Firebase('https://bizgramer.firebaseio.com/');
	var authObj = $firebaseAuth(ref);

  authFactory.getAuth = function (callback){
        var authData = authObj.$getAuth();
        console.log(authData);
        callback(null, authData);
  };

  authFactory.checkLogin = function(){
    authFactory.getAuth(function(data){
      return data;
    });
  }

  authFactory.refreshUser = function(cb){
    var data = window.localStorage.uid;
    var users = Users.getUsers($stateParams.org);
    users.$loaded(function(){
      var key;
      for (var i = 0; i < users.length; i++) {
        if(users[i].uid === data){
          key = users.$keyAt(i);
        }
      }
      cb(users.$getRecord(key));
    })
  }

  authFactory.signin = function(email,password,callback){
    authObj.$authWithPassword({
        email: email,
        password: password
      }).then(function(authData){
        window.localStorage['uid'] = authData.uid;
        callback(authData);
    }).catch(function(error){
      console.log('Error:',error);
      callback(error.code);
    });
  };

  authFactory.setupUser = function(username, org, email, uid, pictureUrl, callback){
    var users = Users.getUsers(org);
    users.$add({
      username: username,
      org: org,
      email: email,
      uid: uid,
      pictureUrl: pictureUrl || null,
      pictureCollection: null
    }).then(function(ref){
      var logInfo = users.$getRecord(ref.key());
      callback(null, logInfo);
    });
  };

  authFactory.signup = function(email, password, orgId, orgName, callback, vm){
    var orgRef = new Firebase('https://bizgramer.firebaseio.com/'+orgName);
    var orgArr = $firebaseArray(orgRef);
    orgArr.$loaded()
      .then(function() {
        if(orgArr.$getRecord('orgKey')['$value'] === orgId) {
          authObj.$createUser({
            email: email,
            password: password
          }).then(function(){
            // console.log("User " + userData.uid + " created successfully!");
            authFactory.signin(email,password,callback,vm);
          }).catch(function(error){
            console.log('Error:',error);
            callback(error.code);
          });
        } else {
          console.log('incorrect Id for ', orgName);
            callback("Incorrect Org Code");

        }
      })
      .catch(function (error) {
        console.log('error', error);
        callback(error.code);

      });
	};

	authFactory.signout = function(){
		authObj.$unauth();
    delete window.localStorage.uid;
	};

	return authFactory;
}]);
