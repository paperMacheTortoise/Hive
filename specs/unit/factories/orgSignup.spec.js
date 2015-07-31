describe('orgSignupFactory', function(){

  var Users, $firebaseArray, $http, Auth, $firebaseObject, OrgSignup;

  beforeEach(module('orgsignupFactory'));
  beforeEach(module('userFactory'));
  beforeEach(module('authFactory'));

  beforeEach(inject(function(_Users_, _$firebaseArray_, _$firebaseObject_, $injector, _Auth_, _OrgSignup_){
    Users = _Users_;
    $firebaseArray = _$firebaseArray_;
    $http = $injector.get('$httpBackend');
    Auth = _Auth_;
    $firebaseObject = _$firebaseObject_;
    OrgSignup = _OrgSignup_;
  }));
  
  afterEach(function() {
    $http.verifyNoOutstandingExpectation();
    $http.verifyNoOutstandingRequest();
  });

  describe('getOrgs', function(){

    it('should exist', function(){
      expect(OrgSignup.getOrgs).to.be.a('function');
    });

    it('should return list of organizations', function(){
      expect(OrgSignup.getOrgs()).to.be.a('object');
    });

  });

  describe('signupOrg', function(){
    
    it('should exist', function(){
      expect(OrgSignup.signupOrg).to.be.a('function');
    });

  });

});