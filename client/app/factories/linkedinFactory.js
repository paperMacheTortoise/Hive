angular.module('linkedinFactory', ['firebase'])

.factory('linkedinAuth', ['$firebaseAuth', '$firebaseArray', function ($http, $firebaseAuth, $firebaseArray){
	
	var linkedinFactory = {};
	var ref = new Firebase('https://bizgramer.firebaseio.com/');
	var action = '';

	linkedinFactory.setAction = function(act){
		action = act;
	};

	linkedinFactory.signin = function(callback){
		// linkedinFactory.getToken()
		// 	.then(function(token){
		// 		ref.authWithCustomToken('token', function(err, authData){
		// 		var data = authData;
		// 		console.log('logged in as' + authData.uid);
		// 		callback(data);
		// 	}).catch(function(error){
		// 	console.log('Error: ', error);
		// 	});
		// });
		linkedinFactory.getAuth()
			.then(function(data){
				console.log(data);
				callback(data);
			})
	};

	linkedinFactory.getAuth = function(){
		return $http({
			method: 'GET',
			url: '/linkedin',
		})
		.then(function(resp){
			return resp.data;
		});
	};

	return linkedinFactory;
}]);