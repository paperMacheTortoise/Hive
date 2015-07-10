use strict;

var app = angular.module('bizGramApp', ['ui.router']);

app.config(function ($stateProvider, $urlRouterProvider) {

	$stateProvider

	.state('landing', {
		url: '/',
		templateUrl: 'app/views/landing.html',

	})

	.state('orgSignUp', {
		url: '/signup'
	})

	.state('userLogin', {
		url: /:org/login'
	})

});