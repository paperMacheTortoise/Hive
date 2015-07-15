describe('SigninController', function(){
	var createController, Users, scope, $rootScope, $state, $firebaseAuth, Auth; 

	beforeEach(module('bizGramApp'));
	beforeEach(inject(function($injector){
		$rootScope = $injector.get('$rootScope');
		Users = $injector.get('Users');
		Auth = $injector.get('Auth');
		scope = $rootScope.$new();
		$state = $injector.get('$state');
		$firebaseAuth = $injector.get('$firebaseAuth');

		var $controller = $injector.get('$controller');

		createController = function(){
			return $controller('SigninController as signin', {
				$scope: scope,
				Auth: Auth,
				Users: Users,
				$state: $state,
				$firebaseAuth: $firebaseAuth,
			}); 
		};
	}));

	it('should have a getSignIn function on the scope', function(){
		createController();
		expect(scope.signin.getSignIn).to.be.a('function');
	});	

	it('should have a signin function on the scope', function(){
		createController();
		expect(scope.signin.signin).to.be.a('function');
	});	

	it('should have a checkLogin function on the scope', function(){
		createController();
		expect(scope.signin.checkLogin).to.be.a('function');
	});	

	// it('should have email and password properties on the scope', function(){
	// 	createController();
	// 	expect(scope.signin.email).to.exist;
	// 	expect(scope.signin.password).to.exist;
	// });	
});