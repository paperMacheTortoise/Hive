describe('userFactory', function(){
	var Users, $firebaseArray;

	beforeEach(module('userFactory'));
	beforeEach(inject(function(_Users_, _$firebaseArray_){
		Users = _Users_;
		$firebaseArray = _$firebaseArray_;
	}));

	describe('User Factory Methods', function(){
		describe('getUsers', function(){
			it('should have a getUsers function', function(){
				expect(Users.getUsers).to.be.a('function');
			});

			it('should return a $firebaseArray of users', function(){
				var users = Users.getUsers("org");
				expect(users).to.be.a('array');
			});
		});

		describe('getDisplayUsers', function(){
			it('should have a getDisplayUsers function', function(){
				expect(Users.getDisplayUsers).to.be.a('function');
			});

			it('should return a $firebaseArray of users without the current user', function(){
				var users = Users.getDisplayUsers("current", "org");
				expect(users).to.be.a('array');
			});
		});

		it('should have a getUserPictures function', function(){
			expect(Users.getUserPictures).to.be.a('function');
		});

		describe('getUsername', function(){
			it('should have a getUsername function', function(){
				expect(Users.getUsername).to.be.a('function');
			});

			it('should return the selected username from the main view', function(){
				var username = Users.getUsername();
				expect(username).to.be.a('string');
			});
		});

		it('should have a setUsername function', function(){
			expect(Users.setUsername).to.be.a('function');
		});
	});
});