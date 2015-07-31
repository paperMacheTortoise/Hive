angular.module('profitCtrl', [])

.controller('profitController', function (Visualization, profitFactory){

  var profit_data = Visualization.getProfitData();
  profit_data.$loaded(function(){
    new profitFactory.ProfitChart(profit_data);
  });


});
