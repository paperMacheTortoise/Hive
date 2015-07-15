describe('roomController', function(){
	var createController, Rooms, scope, $rootScope;

	beforeEach(module('bizGramApp'));
	beforeEach(inject(function($injector){
		$rootScope = $injector.get('$rootScope');
		Rooms = $injector.get('Rooms');
		scope = $rootScope.$new();

		var $controller = $injector.get('$controller');

		createController = function(){
			return $controller('roomController as room', {
				$scope: scope,
				Rooms: Rooms
			}); 
		};
	}));

	// it('should have a roomname property on the scope', function(){
	// 	createController();
	// 	expect(scope.room.roomname).to.be.a('string');
	// });	

	// it('should have a messages property on the scope', function(){
	// 	createController();
	// 	expect(scope.room.messages).to.be.a('array');
	// });	

	it('should have a addMessage function on the scope', function(){
		createController();
		expect(scope.room.addMessage).to.be.a('function');
	});	
});