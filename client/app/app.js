
var app = angular.module('bizGramApp', ['ui.router', 'mainCtrl', 'bizGramFactories','app.auth']);

app.config(function ($stateProvider, $urlRouterProvider) {

	$urlRouterProvider.otherwise('/');

	$stateProvider

	.state('main', {
		url: '/',
		templateUrl: 'app/main/main.html'
	})

	.state('main.room', {
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
	});

});

app.run(function ($rootScope, $window, $location, $state){

	$rootScope.shouldShow = true;
	// $rootScope.$on('$stateChangeStart', function (event, toState){

	// });

});
