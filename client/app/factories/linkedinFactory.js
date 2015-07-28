angular.module('linkedinFactory', ['firebase'])

.factory('LinkedinAuth', ['$firebaseAuth', '$firebaseArray', '$http', function ($firebaseAuth, $firebaseArray, $http){
	
	var linkedinFactory = {};
	// var ref = new Firebase('https://bizgramer.firebaseio.com/');

	// linkedinFactory.setAction = function(act){
	// 	return $http({
	// 		method: 'POST',
	// 		url: '/setAction',
	// 		data: {action: act}
	// 	})
	// 	  .then(function(resp){
	// 	  	return resp;
	// 	  });
	// };

	linkedinFactory.setFBInfo = function(org, uid){
		console.log('SetFBInfo', uid);
		return $http({
			method: 'POST',
			url: '/setFBInfo',
			data: {'org' : org, 'user': uid}
		})
		  .then(function(resp){
		  	return resp;
		  });
	};

	linkedinFactory.setOrg = function(org){
		return $http({
			method: 'POST',
			url: '/setOrg',
			data: {'org' : org}
		})
		  .then(function(resp){
		  	return resp;
		  });
	};

	// linkedinFactory.signin = function(callback){
	// 	// linkedinFactory.getToken()
	// 	// 	.then(function(token){
	// 	// 		ref.authWithCustomToken('token', function(err, authData){
	// 	// 		var data = authData;
	// 	// 		console.log('logged in as' + authData.uid);
	// 	// 		callback(data);
	// 	// 	}).catch(function(error){
	// 	// 	console.log('Error: ', error);
	// 	// 	});
	// 	// });
	// 	linkedinFactory.getAuth()
	// 		.then(function(data){
	// 			callback(data);
	// 		})
	// };

	// linkedinFactory.updateProfile = function(){
	// 	return $http({
	// 		method: 'GET',
	// 		url: '/linkedin'
	// 	}).then(function(resp){
	// 		return resp.data;
	// 	});
	// };

	return linkedinFactory;
}]);