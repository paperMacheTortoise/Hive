describe('oAuthFactory', function(){
  var Users, $firebaseArray, $http, oAuth;
  beforeEach(module('oAuthFactories'));
  beforeEach(module('userFactory'));
  beforeEach(inject(function(_Users_, _$firebaseArray_, $injector, _oAuth_){
    Users = _Users_;
    $firebaseArray = _$firebaseArray_;
    $http = $injector.get('$httpBackend');
    oAuth = _oAuth_;
  }));

  afterEach(function() {
    $http.verifyNoOutstandingExpectation();
    $http.verifyNoOutstandingRequest();
  });

  describe('oAuth methods', function(){

    describe('oAuthIntuit method', function(){

      it('should have oAuthIntuit function', function(){
        expect(oAuth.oAuthIntuit).to.be.a('function');
      });

      xit('should call Users methods', function(){
        var spy = sinon.spy(oAuth.oAuthIntuit);
        oAuth.oAuthIntuit('','hr');
        assert(spy.called);
      });

    });

    describe('getData method', function(){

      it('should have get data method', function(){
        expect(oAuth.getData).to.be.a('function');
      });

      it('should make http requests', function(){
        $http.expectGET('/payable').respond(200);
        $http.expectGET('/receivable').respond(200);
        $http.expectGET('/customers').respond(200);
        oAuth.getData('hr');
        $http.flush();
      });

    });
    
  });

});