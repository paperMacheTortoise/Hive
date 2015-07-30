
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

	$urlRouterProvider.otherwise('/404');

	$stateProvider

	.state('orgsignup', {
		url: '/orgsignup',
		templateUrl: 'app/templates/orgsignup.html',
		data: {
			requireLogin: false
		}
	})
	.state('landing', {
		url: '',
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

	// function authenticate ($q, $rootScope, $state, $timeout, $stateParams, Auth){
	// 	if(window.localStorage.uid){
	// 		$rootScope.shouldShow = false;
	// 		if(!rootScope.logInfo){
	// 			Auth.refereshUser(function(logInfo){
	// 				debugger;
	// 				$rootScope.logInfo = logInfo;
	// 				return $q.when();
	// 			})
	// 		}
	// 		return $q.when()
	// 	} else if (!requireLogin){
	// 		return $q.when();
	// 	} else {
	// 		$timeout(function(){
	// 			$rootScope.shouldShow = true;
	// 			$state.go('signin', {org: $stateParams.org});
	// 		})

	// 		return $q.reject();
	// 	}
	// }
});

app.run(function ($rootScope, $location, $state, $stateParams, Auth, $q, $timeout){
	console.log('apprun', $stateParams);
	// Value for ng-hide and ng-show on index. It displays the login and signup buttons when user is logged out.
	// When user is logged in, displays profile and logout.
	$rootScope.shouldShow = true;

	$rootScope.$on('$stateChangeStart', function (event, toState){
		var requireLogin = toState.data.requireLogin;
		// if(toState.name === 'landing'){
		// 	$state.go(toState);
		// }

		if(requireLogin && !$rootScope.logInfo){
			console.log('rootScope deleted');
			if(window.localStorage.uid){
				console.log('user refreshed');
				Auth.refreshUser(function(){
					$rootScope.shouldShow = false;
					// $rootScope.logInfo = logInfo;
					// console.dir($stateParams);
					$state.go(toState, {org: $stateParams.org});	
				});
			} else {
				console.log('User must log in');
				$state.go('signin', {org: $location.$$path.slice(1)})	
			}
		}

		if(requireLogin && $rootScope.logInfo){
			$rootScope.shouldShow = false;
			console.log('user logged in $stateP: ', $stateParams.org);
			console.log('user logged in rootScope: ', $rootScope.logInfo.org);
			if($rootScope.logInfo.org !== $stateParams.org){
				$state.go('404');
			}
		}

		console.log('going to state: ', toState.name);
	});
});

	// // Checks that the user has been authenticated on each page. If not, the user is redirected to the signin page.
	// $rootScope.$on('$stateChangeStart', function (event, toState){
		
	// 	// Changes navigation menu to profile and logout when user is logged in.
	// 	var requireLogin = toState.data.requireLogin;
	// 	if(requireLogin){
	// 		$rootScope.shouldShow = false;

	// 		if(!$rootScope.logInfo){
	// 		// if users refreshses page without logging out check if user is still authenticated.
	// 		// and add their information back to the rootScope.
	// 			if(window.localStorage.uid){
	// 				console.log('has Auth');
	// 				Auth.refreshUser(function(logInfo){
	// 					console.log(logInfo);
	// 					debugger;
	// 					$rootScope.logInfo = logInfo;
	// 					$rootScope.shouldShow = false;
	// 					$state.go(toState, {org: $stateParams.org});
	// 				});
	// 			} else {
	// 				event.preventDefault();
	// 				console.log('User must be logged in to access page');
	// 				console.dir($stateParams);
	// 				$rootScope.shouldShow = true;
	// 					// redirect user to sign back in
	// 				$state.go('signin', {org: $location.$$path.slice(1)});
	// 			}
	// 		}
	// 	}
	// });

	// at each state chage, check if the user belongs to the organization it is navigating to
	// $rootScope.$on('$stateChangeSuccess', function (event, toState, $stateParams) {
	// // 	// if the user doesnt belong to this organization, redirect to landing page
	// // 	// console.log($stateParams);
	// // 	var requireLogin = toState.data.requireLogin;

	// 	if($rootScope.logInfo.org !== $stateParams.org){
	// 		$state.go('404');
	// 	}
	// });
	// 	// if the user is logged in to one org but tries to navigate to another org
	// 	if (requireLogin && $rootScope.logInfo.org !== $stateParams.org) {
	// 			$state.go('404');
	// 		// redirect to 404
	// 		//console.log($rootScope.logInfo.org);
	// 		//console.log($stateParams.org);
	// 		// if(toState.name === 'main') {
	// 		// 	//$stateParams.org = 'main';
	// 		// 	$state.go('main');
	// 		// }
	// 	}

	// 	console.log('going to state ', toState.name);
	// });

