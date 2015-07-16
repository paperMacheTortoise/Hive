var app = angular.module('bizGramApp', [
	'orgsignupCtrl',
	'orgsignupFactory',
	'authFactory',
	'dmFactory',
	'roomFactory',
	'userFactory',
	'replyFactory',
	'uploadFactory',
	'visualFactory',
	'ui.router', 
	'mainCtrl',
	'visualCtrl',
	'visualReplyCtrl',
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

	.state('orgsignup', {
		url: '/orgsignup',
		templateUrl: 'app/templates/orgsignup.html'
	})
	.state('main', {
		url: '/:org',
		templateUrl: 'app/templates/main.html',
		data: {
			requireLogin: true // applies to all children.
		}
	})
	.state('main.room', {
		url: '/room/:roomName',
		parent: 'main',
		templateUrl: 'app/templates/room.html'
	})
	.state('oAuth', {
		url: '/oAuth',
		templateUrl: 'app/templates/oAuth.html'
	})
	.state('main.direct', {
		url: '/dm/:user',
		parent: 'main',
		templateUrl: 'app/templates/directmessage.html'
	})
	.state('visual', {
		url:'/:org/visual/:visualId',
		templateUrl: 'app/templates/visualization.html',
		data: {
			requireLogin: true
		}
	})
	.state('signin',{
		url: '/:org/signin',
		templateUrl: 'app/templates/signin.html',
		controller:'SigninController'
	})
	.state('signup',{
		url: '/:org/signup',
		templateUrl:'app/templates/signup.html',
		controller:'SignupController'
	})
	// Unathenticates the user and deletes the user information from the $rootScope on logout.
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
		url: '/:org/profile',
		templateUrl: 'app/templates/profile.html',
		controller: 'ProfileController',
		data: {
			requireLogin: true
		}
	})
	.state('upload',{
		url: '/:org/upload',
		templateUrl: 'app/templates/upload.html',
		data: {
			requireLogin: true
		}
	});
});

app.run(function ($rootScope, $window, $location, $state){

	// Value for ng-hide and ng-show on index. It displays the login and signup buttons when user is logged out.
	// When user is logged in, displays profile and logout.
	$rootScope.shouldShow = true;

	// Checks that the user has been authenticated on each page. If not, the user is redirected to the signin page.
	$rootScope.$on('$stateChangeStart', function (event, toState){
		if (toState && toState.data && toState.data.requireLogin) {
			var requireLogin = toState.data.requireLogin;
		} else {
			requireLogin = false;
		}
		if(requireLogin && !$rootScope.logInfo){
			event.preventDefault();
			console.log('User must be logged in to access page');
			$state.go('signin', {org: $location.$$path.slice(1)});
		}
	});
});
