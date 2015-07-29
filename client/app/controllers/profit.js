angular.module('profitCtrl', [])

.controller('profitController', function (profitFactory, $rootScope, $stateParams){

    var dates = [
  { 'Total Income': '10000.00',
    'Total Cost of Sales': '-5500.00',
    'Total Expenses': '-1700.00',
    'Net Earnings': '2800.00' },
    { 'Total Income': '19000.00',
    'Total Cost of Sales': '-5000.00',
    'Total Expenses': '-3600.00',
    'Net Earnings': '10400' },
    { 'Total Income': '5500.00',
    'Total Cost of Sales': '-1000.00',
    'Total Expenses': '2000.00',
    'Net Earnings': '2500.00' },
    { 'Total Income': '10000.00',
    'Total Cost of Sales': '-5500.00',
    'Total Expenses': '-1700.00',
    'Net Earnings': '2800.00' },
    { 'Total Income': '19000.00',
    'Total Cost of Sales': '-5000.00',
    'Total Expenses': '-3600.00',
    'Net Earnings': '10400' },
    { 'Total Income': '5500.00',
    'Total Cost of Sales': '-1000.00',
    'Total Expenses': '2000.00',
    'Net Earnings': '2500.00' },
    { 'Total Income': '10000.00',
    'Total Cost of Sales': '-5500.00',
    'Total Expenses': '-1700.00',
    'Net Earnings': '2800.00' },
    { 'Total Income': '19000.00',
    'Total Cost of Sales': '-5000.00',
    'Total Expenses': '-3600.00',
    'Net Earnings': '10400' },
    { 'Total Income': '5500.00',
    'Total Cost of Sales': '-1000.00',
    'Total Expenses': '-2000.00',
    'Net Earnings': '2500.00' },
    { 'Total Income': '19000.00',
    'Total Cost of Sales': '-5000.00',
    'Total Expenses': '-3600.00',
    'Net Earnings': '10400' },
    { 'Total Income': '5500.00',
    'Total Cost of Sales': '-1000.00',
    'Total Expenses': '-5000.00',
    'Net Earnings': '-500.00' }
  ]

  var graph = new profitFactory.ProfitChart(dates);

});
