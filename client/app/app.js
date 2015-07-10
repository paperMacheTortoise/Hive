use strict;

var app = angular.module('bizGramApp', ['ui.router', 'MainCtrl']);

app.config(function ($stateProvider, $urlRouterProvider) {

	$stateProvider

	.state('main', {
		url: '/',
		controller: 'mainController as main',
		templateUrl: 'app/views/main.html',
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