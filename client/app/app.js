
window.host = 'localhost';

var app = window.bizGramApp = angular.module('bizGramApp', [

	'indexCtrl',
	'404Ctrl',
	'orgsignupCtrl',
	'orgsignupFactory',
	'inviteCtrl',
	'inviteFactory',
	'authFactory',
	'dmFactory',
	'roomFactory',
	'userFactory',
	'replyFactory',
	'uploadFactory',
	'visualFactory',
	'linkedinFactory',
	'mainCtrl',
	'aRVisualCtrl',
	'aPVisualCtrl',
	'visualCtrl',
	'visualReplyCtrl',
	'authCtrl',
	'directMessageCtrl',
	'roomCtrl',
	'replyCtrl',
	'profileCtrl',
	'ui.router',
	'angularMoment',
	'luegg.directives',
	'mapCtrl',
	'EditCtrl',
	'connectIntuitAngular',
	'ngImgur',
	'oAuthFactories',
	'ngSanitize',
	'profitFactory',
	'profitCtrl'
	]);

app.config(function ($stateProvider, $urlRouterProvider) {

	// need to dynamically create routes based on the rooms available

	$urlRouterProvider.otherwise('/');

	$stateProvider

	.state('orgsignup', {
		url: '/orgsignup',
		templateUrl: 'app/templates/orgsignup.html',
		data: {
			requireLogin: false
		}
	})
	.state('landing', {
		url: '/',
		templateUrl: 'app/templates/landing.html',
		data: {
			requireLogin: false
		}
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
	.state('main.invite', {
		url: '/invite',
		parent: 'main',
		templateUrl: 'app/templates/invite.html'
	})
	.state('main.direct', {
		url: '/dm/:user',
		parent: 'main',
		templateUrl: 'app/templates/directmessage.html'
	})
	.state('visual', {
		url:'/:org/visual',
		templateUrl: 'app/templates/visualization.html',
		data: {
			requireLogin: true // applies to all children
		}
	})
	.state('visual.ARVisual', {
		url:'/ARVisual',
		parent:'visual',
		templateUrl: 'app/templates/aRVisualization.html',
	})
	.state('visual.APVisual', {
		url:'/APVisual',
		parent:'visual',
		templateUrl: 'app/templates/aPVisualization.html',
	})
	.state('visual.CustomerMap', {
		url:'/customerMap',
		parent:'visual',
		templateUrl: 'app/templates/map.html',
	})
	.state('visual.profit', {
		url: '/profit',
		parent: 'visual',
		templateUrl: 'app/templates/profitviz.html',
	})
	.state('signin',{
		url: '/:org/signin',
		templateUrl: 'app/templates/signin.html',
		controller:'SigninController',
		data: {
			requireLogin: false
		}
	})
	.state('signup',{
		url: '/:org/signup',
		templateUrl:'app/templates/signup.html',
		controller:'SignupController',
		data: {
			requireLogin: false
		}
	})
	// Unathenticates the user and deletes the user information from the $rootScope on logout.
	.state('logout',{
		url: ':org/logout',
		controller: function(Auth, $state, $rootScope, $stateParams){
			$state.go('signin', {org: $stateParams.org});
			$rootScope.shouldShow = true;
			$rootScope.logInfo = null;
			Auth.signout();
		},
		data: {
			requireLogin: false
		}
	})
	.state('linkedin',{
		url: '/:org/linkedinsuccess',
		templateUrl: 'app/templates/linkedinsuccess.html',
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
	.state('edit',{
		url: '/:org/edit',
		templateUrl: 'app/templates/profile-edit.html',
		controller: 'EditController',
		data: {
			requireLogin: true
		}
	})
	.state('404', {
		url: '404',
		templateUrl: 'app/templates/404.html',
		data: {
			requireLogin: true
		}
	})
	.state('oAuth', {
		url: '/oAuth',
		templateUrl: 'app/templates/oAuth.html',
		data: {
			requireLogin: true
		}
	});
});

app.run(function ($rootScope, $location, $state, $stateParams, Auth){
	// Value for ng-hide and ng-show on index. It displays the login and signup buttons when user is logged out.
	// When user is logged in, displays profile and logout.
	$rootScope.shouldShow = true;

	$rootScope.$on('$stateChangeStart', function (event, toState){
		var requireLogin = toState.data.requireLogin;

		// checks if page requires authentication and if user is not logged in.
		if(requireLogin && !$rootScope.logInfo){
			
			// checks if user is still authenticated
			if(window.localStorage.uid){
				// refreshes the user on the rootScope
				Auth.refreshUser(function(logInfo){
					$rootScope.shouldShow = false;
					$rootScope.logInfo = logInfo;
					// redirects to the page the user is reloading
					$state.go(toState, {org: $stateParams.org});	
				});
			} else {
				console.log('User must log in');
				$state.go('signin', {org: $location.$$path.slice(1)});	
			}
		}
	});

	$rootScope.$on('$stateChangeSuccess', function (event, toState){
		var requireLogin = toState.data.requireLogin;

		// checks if page requires authentication and if user is signed in.
		if(requireLogin && $rootScope.logInfo){
			// shows the profile and logout options
			$rootScope.shouldShow = false;
			// if user tries to navigate to another organization, user is redirected
			// to 404 page
			if($rootScope.logInfo.org !== $stateParams.org){
				console.log('404');
				console.log('state', $stateParams);
				console.log('root', $rootScope.logInfo.org);
				$rootScope.shouldShow = true;
				$state.go('404');
			}
		}

		console.log('going to state: ', toState.name);
	});
});


