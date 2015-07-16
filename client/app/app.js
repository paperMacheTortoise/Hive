var app = angular.module('bizGramApp', [
	'authFactory',
	'dmFactory',
	'roomFactory',
	'userFactory',
	'replyFactory',
	'uploadFactory',
	'ui.router', 
	'mainCtrl',
	'authCtrl', 
	'directMessageCtrl',
	'roomCtrl', 
	'replyCtrl', 
	'profileCtrl', 
	'uploadCtrl']);

app.config(function ($stateProvider, $urlRouterProvider) {

	// need to dynamically create routes based on the rooms available

	$urlRouterProvider.otherwise('/signin');

	$stateProvider

	.state('main', {
		url: '/',
		templateUrl: 'app/templates/main.html',
		data: {
			requireLogin: true // applies to all children.
		}
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
	.state('logout',{
		url: '/logout',
		controller: function(Auth, $location, $rootScope){
			Auth.signout();
			delete $rootScope.logInfo;
			$location.path('/signin');
		},
		data: {
			requireLogin: true
		}
	})
	.state('profile',{
		url: '/profile',
		templateUrl: 'app/templates/profile.html',
		controller: 'ProfileController',
		data: {
			requireLogin: true
		}
	})
	.state('upload',{
		url: '/upload',
		templateUrl: 'app/templates/upload.html',
		data: {
			requireLogin: true
		}
	});
});

app.run(function ($rootScope, $window, $location, $state){

	$rootScope.shouldShow = true;
	$rootScope.$on('$stateChangeStart', function (event, toState){
		var requireLogin = toState.data.requireLogin;
		if(requireLogin && !$rootScope.logInfo){
			event.preventDefault();
			console.log('User must be logged in to access page');
			$state.go('signin');
		}
	});

});
