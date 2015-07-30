angular.module('connectIntuitAngular',[])

// This custom directive creates a quickbooks login button that can be injected
// into one of the pages.  It has a callback page as a parameter for intuit OAuth.

.directive('connectToQuickbooks', function ($window, $rootScope, LinkedinAuth){
  return {
    restrict: 'E',    template: "<ipp:connectToIntuit></ipp:connectToIntuit>",
    link: function(scope) {
        var script = $window.document.createElement("script");
        script.type = "text/javascript";
        script.src = "https://appcenter.intuit.com/Content/IA/intuit.ipp.anywhere-1.3.2.js";
        script.onload = function () {
           scope.$emit('intuitjs:loaded');
        };
        
        $window.document.body.appendChild(script);
        scope.$on('intuitjs:loaded', function () {
        LinkedinAuth.setOrg($rootScope.logInfo.org);
          $window.intuit.ipp.anywhere.setup({ 
            grantUrl: 'http://127.0.0.1:3000/auth/intuit/callback',
            datasources: {
              quickbooks : true
          } 
          });
          scope.connected = true;
          scope.$apply();
        });
    }
  };
});