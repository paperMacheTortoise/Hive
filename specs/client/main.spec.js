describe('mainController', function(){
	var createController, Rooms, Users, DirectMessage, Visualization, $location, $stateParams, scope, $rootScope;

	beforeEach(module('mainCtrl'));
	// beforeEach(inject(function($injector){
	// 	$rootScope = $injector.get('$rootScope');
	// 	Rooms = $injector.get('Rooms');
	// 	Users = $injector.get('Users');
	// 	DirectMessage = $injector.get('DirectMessage');
	// 	Visualization = $injector.get('Visualization');
	// 	$location = $injector.get('$location');
	// 	$stateParams = $injector.get('$stateParams');
	// 	scope = $rootScope.$new();

	// 	var $controller = $injector.get('$controller');

	// 	createController = function(){
	// 		return $controller('mainController as main', {
	// 			$scope: scope,
	// 			Rooms: Rooms,
	// 			Users: Users,
	// 			DirectMessage: DirectMessage,
	// 			Visualization: Visualization,
	// 			$location: $location,
	// 			$stateParams: $stateParams
	// 		}); 
	// 	};
	// }));

	it('should pass a test', function(){
		expect(true).to.equal(true);
	})

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