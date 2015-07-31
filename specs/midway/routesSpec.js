describe('ngMidwayTester', function() {

  var tester,
  appName = 'bizGramApp';


  // before(function() {

  //   tester = ngMidwayTester(appName);
  // });

  // // afterEach(function() {
  // //   tester.destroy();
  // //   tester = null;
  // // });

  it('should register a module', function() {
    var example = angular.module(appName, [])
      .run(function($rootScope) {
        $rootScope.value = 'true';
      });
    tester = ngMidwayTester(appName);
    expect(tester.module()).to.equal(example);
    expect(tester.rootScope().value).to.equal('true');
  });

  it("should have a working /orgsignup' route", function(done) {
    tester = ngMidwayTester(appName);
    tester.visit('/orgsignup', function() {
      expect(tester.path()).to.equal('/orgsignup');
      expect(tester.controller()).to.equal('OrgsignupController');
      //expect(tester.viewElement().html()).to.contain('Organization Signup');

      var scope = tester.viewScope();
      //expect(scope.title).to.equal('my home page');
      done();
    });
  });


  it('should kill the tester', function() {
    tester.destroy();
    tester = null;
  });

  // // afterEach(function() {
  // //   tester.destroy();
  // //   tester = null;
  // // });

//   it("should have a working videos_path route", function() {
//     expect(ROUTER.routeDefined('videos_path')).to.equal(true);
//     var url = ROUTER.routePath('videos_path');
//     expect(url).to.equal('/videos');
//   });

//   it("should have a videos_path route that should goto the VideosCtrl controller", function() {
//     var route = ROUTER.getRoute('videos_path');
//     route.params.controller.should.equal('VideosCtrl');
//   });

//   it("should have a working video_path route", function() {
//     expect(ROUTER.routeDefined('video_path')).to.equal(true);
//     var url = ROUTER.routePath('video_path', { id : 10 });
//     expect(url).to.equal('/videos/10');
//   });

//   it("should have a videos_path route that should goto the VideoCtrl controller", function() {
//     var route = ROUTER.getRoute('video_path');
//     route.params.controller.should.equal('VideoCtrl');
//   });

//   it("should have a working watched_videos_path route", function() {
//     expect(ROUTER.routeDefined('watched_videos_path')).to.equal(true);
//     var url = ROUTER.routePath('watched_videos_path');
//     expect(url).to.equal('/watched-videos');
//   });

//   it("should have a videos_path route that should goto the WatchedVideosCtrl controller", function() {
//     var route = ROUTER.getRoute('watched_videos_path');
//     route.params.controller.should.equal('WatchedVideosCtrl');
//   });

//   it("should have a home_path route that should be the same as the videos_path route", function() {
//     expect(ROUTER.routeDefined('home_path')).to.equal(true);
//     var url1 = ROUTER.routePath('home_path');
//     var url2 = ROUTER.routePath('videos_path');
//     expect(url1).to.equal(url2);
//   });

//   it("should have a home_path route that should goto the VideosCtrl controller", function() {
//     var route = ROUTER.getRoute('home_path');
//     route.params.controller.should.equal('VideosCtrl');
//   });

// });







});
