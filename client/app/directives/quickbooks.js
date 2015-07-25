angular.module('connectIntuitAngular',[])
.directive('connectToQuickbooks', function($window, $rootScope){
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
          $window.intuit.ipp.anywhere.setup({ 
          	grantUrl: 'http://127.0.0.1:3000/auth/intuit/callback/'+$rootScope.logInfo.org,
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