var app = angular.module('bizGramApp', [
	'ui.router', 
	'mainCtrl', 
	'bizGramFactories',
	'authFactory',
	'app.auth', 
	'roomCtrl', 
	'replyCtrl',
	'dmFactory',
	'directMessageCtrl', 
	'app.profile', 
	'app.upload']);

app.config(function ($stateProvider, $urlRouterProvider) {

	// need to dynamically create routes based on the rooms available

	$urlRouterProvider.otherwise('/signin');

	$stateProvider

	.state('main', {
		url: '/',
		templateUrl: 'app/templates/main.html'
	})
	.state('main.room', {
		url: 'room/:roomName',
		parent: 'main',
		templateUrl: 'app/templates/room.html'
	})
	.state('oAuth', {
		url: '/oAuth',
		templateUrl: 'app/templates/oAuth.html'
	})
	.state('main.direct', {
		url: 'dm/:user',
		parent: 'main',
		templateUrl: 'app/templates/directmessage.html'
	})
	.state('signin',{
		url: '/signin',
		templateUrl: 'app/templates/signin.html',
		controller:'SigninController'
	})
	.state('signup',{
		url: '/signup',
		templateUrl:'app/templates/signup.html',
		controller:'SignupController'
	})
	.state('profile',{
		url: '/profile',
		templateUrl: 'app/templates/profile.html',
		controller: 'ProfileController'
	})
	.state('upload',{
		url: '/upload',
		templateUrl: 'app/templates/upload.html',
	});
});

app.run(function ($rootScope, $window, $location, $state, Auth){

	$rootScope.shouldShow = true;
	$rootScope.logout = function(){
		Auth.signout();
		$rootScope.shouldShow = true;
	};

});
