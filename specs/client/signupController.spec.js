describe('SignupController', function(){
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
			return $controller('SignupController as signup', {
				$scope: scope,
				Auth: Auth,
				Users: Users,
				$state: $state,
				$firebaseAuth: $firebaseAuth,
			}); 
		};
	}));

	// it('should have a setupUser function on the scope', function(){
	// 	createController();
	// 	expect(scope.signup.setupUser).to.be.a('function');
	// });	

	// it('should have a signup function on the scope', function(){
	// 	createController();
	// 	expect(scope.signup.signup).to.be.a('function');
	// });	

	// it('should have a checkLogin function on the scope', function(){
	// 	createController();
	// 	expect(scope.signup.checkLogin).to.be.a('function');
	// });	

	// it('should have email, password, orgCode, and name properties on the scope', function(){
	// 	createController();
	// 	expect(scope.signup.email).to.exist;
	// 	expect(scope.signup.password).to.exist;
	// 	expect(scope.signup.orgCode).to.exist;
	// 	expect(scope.signup.name).to.exist;
	// });	
});