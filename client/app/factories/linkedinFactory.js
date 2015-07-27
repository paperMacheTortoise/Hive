angular.module('linkedinFactory', ['firebase'])

.factory('LinkedinAuth', ['$firebaseAuth', '$firebaseArray', '$http', function ($firebaseAuth, $firebaseArray, $http, Users){
	
	var linkedinFactory = {};
	var ref = new Firebase('https://bizgramer.firebaseio.com/');

	linkedinFactory.setAction = function(act){
		return $http({
			method: 'POST',
			url: '/setAction',
			data: {action: act}
		})
		  .then(function(resp){
		  	return resp;
		  });
	};

	linkedinFactory.setOrg = function(org){
		$http({
			method: 'POST',
			url: '/setOrg',
			data: {'org' : org}
			// headers: {'Content-Type': 'application/x-www-form-urlencoded'}
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

	linkedinFactory.getAuthObj = function(){
		return $http({
			method: 'GET',
			url: '/linkedin'
		}).then(function(resp){
			console.log('getAuth called');
			return resp.data;
		});
	};

	return linkedinFactory;
}]);