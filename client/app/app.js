var app = angular.module('bizGramApp', ['ui.router', 'mainCtrl', 'bizGramFactories']);

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

});
