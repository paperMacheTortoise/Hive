angular.module('linkedinFactory', ['firebase'])

.factory('LinkedinAuth', ['$firebaseAuth', '$firebaseArray', '$http', function ($http, $firebaseAuth, $firebaseArray){
	
	var linkedinFactory = {};
	var ref = new Firebase('https://bizgramer.firebaseio.com/');
	var action = '';

	linkedinFactory.setAction = function(act){
		action = act;
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
			url: '/linkedin',
		})
		.then(function (resp) {
			console.log('getAuth called');
			return resp;
		});
	};

	return linkedinFactory;
}]);