describe('Unit Testing: dmFactory', function(){
	var DirectMessage, $firebaseArray;

	beforeEach(angular.mock.module('bizGramApp'));

	// beforeEach(inject(function(_DirectMessage_, _$firebaseArray_){
	// 	DirectMessage = _DirectMessage_;
	// 	$firebaseArray = _$firebaseArray_;
	// }));

	it('should be connected to bizGramApp', function(){
		expect(bizGramApp).not.to.equal(null);
	})

	// it('should contain DirectMessage factory', inject(function(DirectMessage){
	// 	expect(DirectMessage).not.to.equal(null);
	// }))

	// describe('addMessage', function(){
	// 	it('should have an addMessage function', function(){
	// 		expect(DirectMessage.addMessage).to.be.a('function');
	// 	});
	// });

	// describe('getDirectMessages', function(){
	// 	it('should have a getDirectMessages function', function(){
	// 		expect(DirectMessage.getDirectMessages).to.be.a('function');
	// 	});

	// 	it('should return a $firebaseArray', function(){
	// 		var messages = DirectMessage.getDirectMessages();
	// 		expect(messages).to.be.a('array');
	// 	});
	// });
});
