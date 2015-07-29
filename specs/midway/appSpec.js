describe("Midway: Testing Modules", function() {
  describe("App Module: ", function() {
    var module;
    before(function() {
      module = angular.module("bizGramApp");
    });

    it("should be registered", function() {
      expect(module).not.to.equal(null);
    });

    describe('Dependencies: ', function() {
      var deps;

      var hasModule = function(m) {
        return deps.indexOf(m) >= 0;
      };
      before(function() {
        deps = module.value('appName').requires;
      });

      //you can also test the module's dependencies
      it("should have dmFactory as a dependency", function() {
        expect(hasModule('dmFactory')).to.equal(true);
      });

      it("should have mainCtrl as a dependency", function() {
        expect(hasModule('mainCtrl')).to.equal(true);
      });

      it("should have directMessageCtrl as a dependency", function() {
        expect(hasModule('directMessageCtrl')).to.equal(true);
      });

      it("should have roomFactory as a dependency", function() {
        expect(hasModule('roomFactory')).to.equal(true);
      });

      it("should have uploadFactory as a dependency", function() {
        expect(hasModule('uploadFactory')).to.equal(true);
      });

    })
  })
})
