
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
  'uploadAngular',
  'uploadCtrl',
  'ngImgur',
  'oAuthFactories',
  'ngSanitize',
  'profitCtrl'
  ]);

app.config(function ($stateProvider, $urlRouterProvider) {

  // need to dynamically create routes based on the rooms available

  $urlRouterProvider.otherwise('/');

  $stateProvider

  .state('orgsignin', {
    url: '/orgsignin',
    templateUrl: 'app/Authentication/orgsignin.html',
    data: {
      requireLogin: false
    }
  })
  .state('landing', {
    url: '/',
    templateUrl: 'app/Authentication/landing.html',
    data: {
      requireLogin: false
    }
  })
  .state('main', {
    url: '/:org',
    templateUrl: 'app/MainMenu/main.html',
    data: {
      requireLogin: true // applies to all children.
    }
  })
  .state('main.room', {
    url: '/room/:roomName',
    parent: 'main',
    templateUrl: 'app/Chatroom/room.html'
  })
  .state('main.invite', {
    url: '/invite',
    parent: 'main',
    templateUrl: 'app/Invites/invite.html'
  })
  .state('main.direct', {
    url: '/dm/:user',
    parent: 'main',
    templateUrl: 'app/DirectMessages/directmessage.html'
  })
  .state('visual', {
    url:'/:org/visual',
    templateUrl: 'app/Visualizations/visualization.html',
    data: {
      requireLogin: true // applies to all children
    }
  })
  .state('visual.ARVisual', {
    url:'/ARVisual',
    parent:'visual',
    templateUrl: 'app/Visualizations/ReceivablesVisuals/aRVisualization.html',
  })
  .state('visual.APVisual', {
    url:'/APVisual',
    parent:'visual',
    templateUrl: 'app/Visualizations/PayablesVisuals/aPVisualization.html',
  })
  .state('visual.CustomerMap', {
    url:'/customerMap',
    parent:'visual',
    templateUrl: 'app/Visualizations/CustomerMapVisuals/mapVisual.html',
  })
  .state('visual.profit', {
    url: '/profit',
    parent: 'visual',
    templateUrl: 'app/Visualizations/ProfitLossVisuals/profitVisual.html',
  })
  .state('signin',{
    url: '/:org/signin',
    templateUrl: 'app/Authentication/signin.html',
    data: {
      requireLogin: false
    }
  })
  .state('signup',{
    url: '/:org/signup',
    templateUrl:'app/Authentication/signup.html',
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
    templateUrl: 'app/LinkedIn/linkedinsuccess.html',
    data: {
      requireLogin: true
    }
  })
  .state('profile',{
    url: '/:org/profile',
    templateUrl: 'app/Profile/profile.html',
    data: {
      requireLogin: true
    }
  })
  .state('edit',{
    url: '/:org/edit',
    templateUrl: 'app/Profile/Edit/profile-edit.html',
    data: {
      requireLogin: true
    }
  })
  .state('404', {
    url: '404',
    templateUrl: 'app/Errors/404.html',
    data: {
      requireLogin: true
    }
  })
  .state('oAuth', {
    url: '/oAuth',
    templateUrl: 'app/Quickbooks/oAuth.html',
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
        },$stateParams.org);
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
        $rootScope.shouldShow = true;
        if(toState.name === '404'){
          $state.go('landing');
        }
        $state.go('404');
      }
    }

    console.log('going to state: ', toState.name);
  });
});


