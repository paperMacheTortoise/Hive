var app = angular.module('bizGramApp', [
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
	'ngImgur'
	]);

app.config(function ($stateProvider, $urlRouterProvider) {

	// need to dynamically create routes based on the rooms available

	$urlRouterProvider.otherwise('/404');

	$stateProvider

	.state('orgsignup', {
		url: '/orgsignup',
		templateUrl: 'app/templates/orgsignup.html'
	})
	.state('landing', {
		url: '',
		templateUrl: 'app/templates/landing.html'
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
	.state('404', {
		url: '404',
		templateUrl: 'app/templates/404.html'
	})
	.state('oAuth', {
		url: '/oAuth',
		templateUrl: 'app/templates/oAuth.html'
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
			requireLogin: true
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
	.state('linkedin',{
		url: '/:org/linkedin',
		templateUrl: 'app/templates/linkedinSuccess.html',
		data: {
			requireLogin: false
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
	});
});

app.run(function ($rootScope, $window, $location, $state, $stateParams){

	// Value for ng-hide and ng-show on index. It displays the login and signup buttons when user is logged out.
	// When user is logged in, displays profile and logout.
	$rootScope.shouldShow = true;

	// Checks that the user has been authenticated on each page. If not, the user is redirected to the signin page.
	$rootScope.$on('$stateChangeStart', function (event, toState){
		// landing page doesn't require logging in
		if (toState.name === 'landing') {
			var requireLogin;
			if (toState && toState.data && toState.data.requireLogin) {
				requireLogin = toState.data.requireLogin;
			} else {
				requireLogin = false;
			}
			if(requireLogin && !$rootScope.logInfo && toState.name!=='signup'){
				event.preventDefault();
				console.log('User must be logged in to access page');
				// console.log($location.$$path.slice(1));
				console.dir($stateParams);
				$state.go('signin', {org: $location.$$path.slice(1)});
			}
		}
	});

	// at each state chage, check if the user belongs to the organization it is navigating to
	$rootScope.$on('$stateChangeSuccess', function (event, toState, $stateParams) {
		// if the user doesnt belong to this organization, redirect to landing page
		// console.log($stateParams);
		if ($stateParams.org === '') {
			$state.go('landing');
		}
		if ($rootScope.logInfo) {
			$rootScope.shouldShow = false;
		} else {
			$rootScope.shouldShow = true;
		}
		// if the user is logged in to one org but tries to navigate to another org
		if ($rootScope.logInfo && $rootScope.logInfo.org !== $stateParams.org) {
			// redirect to 404
			//console.log($rootScope.logInfo.org);
			//console.log($stateParams.org);
			if(toState.name === 'main') {
				//$stateParams.org = 'main';
				$state.go('main');
			}
			$state.go('404');
		}
		console.log('going to state ', toState.name);
		// console.log($rootScope.logInfo);
		if (toState.name === 'main' && !$rootScope.logInfo) {
			$state.go('landing');
		}
	});

});
