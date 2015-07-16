describe('replyController', function(){
	var createController, Rooms, Replies, scope, $rootScope;

	beforeEach(module('bizGramApp'));
	beforeEach(inject(function($injector){
		$rootScope = $injector.get('$rootScope');
		Rooms = $injector.get('Rooms');
		Replies = $injector.get('Replies');
		scope = $rootScope.$new();

		var $controller = $injector.get('$controller');

		createController = function(){
			return $controller('replyController as reply', {
				$scope: scope,
				Rooms: Rooms,
				Replies: Replies
			}); 
		};
	}));

	// it('should have a isReplying property on the scope', function(){
	// 	createController();
	// 	expect(scope.reply.isReplying).to.be.a('boolean');
	// });	

	// it('should have a toggleReplying function on the scope', function(){
	// 	createController();
	// 	expect(scope.reply.toggleReplying).to.be.a('function');
	// });	

	// it('should have a addReply function on the scope', function(){
	// 	createController();
	// 	expect(scope.reply.addReply).to.be.a('function');
	// });	
});