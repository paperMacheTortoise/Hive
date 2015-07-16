describe('mainController', function(){
	var createController, Rooms, Users, scope, $rootScope;

	beforeEach(module('bizGramApp'));
	beforeEach(inject(function($injector){
		$rootScope = $injector.get('$rootScope');
		Rooms = $injector.get('Rooms');
		Users = $injector.get('Users');
		scope = $rootScope.$new();

		var $controller = $injector.get('$controller');

		createController = function(){
			return $controller('mainController as main', {
				$scope: scope,
				Rooms: Rooms,
				Users: Users
			}); 
		};
	}));

	// it('should have a currentUser property on the scope', function(){
	// 	createController();
	// 	expect(scope.main.currentUser).to.be.a('string');
	// });	

	// it('should have a rooms property on the scope', function(){
	// 	createController();
	// 	expect(scope.main.rooms).to.be.a('array');
	// });	

	// it('should have a users property on the scope', function(){
	// 	createController();
	// 	expect(scope.main.users).to.be.a('array');
	// });	

	// it('should have a setRoom function on the scope', function(){
	// 	createController();
	// 	expect(scope.main.setRoom).to.be.a('function');
	// });	
});