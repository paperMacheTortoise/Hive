var app = angular.module('bizGramApp', ['ui.router', 'mainCtrl', 'bizGramFactories','app.auth', 'roomCtrl', 'app.profile']);

app.config(function ($stateProvider, $urlRouterProvider) {

	$urlRouterProvider.otherwise('/');

	$stateProvider

	.state('main', {
		url: '/',
		templateUrl: 'app/main/main.html'
	})

	.state('room', {
		url: '/room',
		templateUrl: 'app/room/room.html'
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
	});

});

app.run(function ($rootScope, $window, $location, $state, Auth){

	$rootScope.shouldShow = true;
	$rootScope.logout = function(){
		Auth.signout();
		$rootScope.shouldShow = true;
	};

});
