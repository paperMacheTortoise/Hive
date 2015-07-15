var app = angular.module('bizGramApp', [
	'ui.router', 
	'mainCtrl', 
	'bizGramFactories',
	'authFactory',
	'app.auth', 
	'roomCtrl', 
	'replyCtrl', 
	'app.profile', 
	'app.upload']);

app.config(function ($stateProvider, $urlRouterProvider) {

	// need to dynamically create routes based on the rooms available

	$urlRouterProvider.otherwise('/');

	$stateProvider

	.state('main', {
		url: '/',
		templateUrl: 'app/main/main.html'
	})
	.state('main.room', {
		url: 'room/:roomName',
		parent: 'main',
		templateUrl: 'app/room/room.html'
	})
	.state('oAuth', {
		url: '/oAuth',
		templateUrl: 'app/oAuth/oAuth.html'
	})
	.state('main.direct', {
		url: '/dm',
		templateUrl: 'app/dm/directmessage.html'
	})
	.state('signin',{
		url: '/signin',
		templateUrl: 'app/auth/signin.html',
		controller:'SigninController'
	})
	.state('signup',{
		url: '/signup',
		templateUrl:'app/auth/signup.html',
		controller:'SignupController'
	})
	.state('profile',{
		url: '/profile',
		templateUrl: 'app/profile/profile.html',
		controller: 'ProfileController'
	})
	.state('upload',{
		url: '/upload',
		templateUrl: 'app/upload/upload.html',
	});
});

app.run(function ($rootScope, $window, $location, $state, Auth){

	$rootScope.shouldShow = true;
	$rootScope.logout = function(){
		Auth.signout();
		$rootScope.shouldShow = true;
	};

});
