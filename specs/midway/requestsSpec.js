describe("Midway: Testing Requests", function() {

  var tester;
  beforeEach(function() {
    if(tester) {
      tester.destroy();
    }
    tester = ngMidwayTester('bizGramApp');
  });

  it("should go to the landing by default", function(done) {
    tester.visit('/', function() {
      expect(tester.viewElement().html()).to.contain('Log in to your Organization:');
      done();
    });
  });

  it("should have a working orgsignup", function(done) {
    // var url = ROUTER.routePath('video_path', { id : 10 });
    var url = '/orgsignup';
    tester.visit(url, function() {
      // var $params = tester.inject('$routeParams');
      // expect(parseInt($params.id)).to.equal(10);

      expect(tester.viewElement().html()).to.contain('Organization Signup');
      done();
    });
  });

  // it("should have a working other_path request", function(done) {
  //   var url = ROUTER.routePath('other_path');
  //   tester.visit(url, function() {
  //     expect(tester.viewElement().html()).to.contain('other page');
  //     done();
  //   });
  // });

});
