describe('dmFactory', function(){
	var createFactory, DirectMessage, $firebaseArray;

	beforeEach(module('dmFactory'));
	beforeEach(inject(function(_DirectMessage_, _$firebaseArray_){
		DirectMessage = _DirectMessage_;
		$firebaseArray = _$firebaseArray_;
	}));

	describe('addMessage', function(){
		it('should have an addMessage function', function(){
			expect(DirectMessage.addMessage).to.be.a('function');
		});
	});

	describe('getDirectMessages', function(){
		it('should have a getDirectMessages function', function(){
			expect(DirectMessage.getDirectMessages).to.be.a('function');
		});
		
		it('should return a $firebaseArray', function(){
			var messages = DirectMessage.getDirectMessages();
			expect(messages).to.be.a('array');
		});
	});
});