angular.module('mapCtrl', ['firebase'])
.controller('MapController', function (Visualization, $rootScope, $stateParams) {
  var vm = this;
  vm.org = $stateParams.org;
  vm.username = $rootScope.logInfo.username;

  // TO DO, set the visualization identifier
  vm.visualId = 'Customer Map';
  var states = {
    "AZ": { "fillKey": "", "numCo": 0},
    "CO": { "fillKey": "", "numCo": 0},
    "DE": { "fillKey": "", "numCo": 0},
    "FL": { "fillKey": "", "numCo": 0},
    "GA": { "fillKey": "", "numCo": 0},
    "HI": { "fillKey": "", "numCo": 0},
    "ID": { "fillKey": "", "numCo": 0},
    "IL": { "fillKey": "", "numCo": 0},
    "IN": { "fillKey": "", "numCo": 0},
    "IA": { "fillKey": "", "numCo": 0},
    "KS": { "fillKey": "", "numCo": 0},
    "KY": { "fillKey": "", "numCo": 0},
    "LA": { "fillKey": "", "numCo": 0},
    "MD": { "fillKey": "", "numCo": 0},
    "ME": { "fillKey": "", "numCo": 0},
    "MA": { "fillKey": "", "numCo": 0},
    "MN": { "fillKey": "", "numCo": 0},
    "MI": { "fillKey": "", "numCo": 0},
    "MS": { "fillKey": "", "numCo": 0},
    "MO": { "fillKey": "", "numCo": 0},
    "MT": { "fillKey": "", "numCo": 0},
    "NC": { "fillKey": "", "numCo": 0},
    "NE": { "fillKey": "", "numCo": 0},
    "NV": { "fillKey": "", "numCo": 0},
    "NH": { "fillKey": "", "numCo": 0},
    "NJ": { "fillKey": "", "numCo": 0},
    "NY": { "fillKey": "", "numCo": 0},
    "ND": { "fillKey": "", "numCo": 0},
    "NM": { "fillKey": "", "numCo": 0},
    "OH": { "fillKey": "UNDECIDED", "numCo": 0},
    "OK": { "fillKey": "", "numCo": 0},
    "OR": { "fillKey": "", "numCo": 0},
    "PA": { "fillKey": "", "numCo": 0},
    "RI": { "fillKey": "", "numCo": 0},
    "SC": { "fillKey": "", "numCo": 0},
    "SD": { "fillKey": "", "numCo": 0},
    "TN": { "fillKey": "", "numCo": 0},
    "TX": { "fillKey": "", "numCo": 0},
    "UT": { "fillKey": "", "numCo": 0},
    "WI": { "fillKey": "", "numCo": 0},
    "VA": { "fillKey": "", "numCo": 0},
    "VT": { "fillKey": "", "numCo": 0},
    "WA": { "fillKey": "", "numCo": 0},
    "WV": { "fillKey": "", "numCo": 0},
    "WY": { "fillKey": "", "numCo": 0},
    "CA": { "fillKey": "", "numCo": 0},
    "CT": { "fillKey": "", "numCo": 0},
    "AK": { "fillKey": "", "numCo": 0},
    "AR": { "fillKey": "", "numCo": 0},
    "AL": { "fillKey": "", "numCo": 0}
  };

  // This function fetches customers from the DB and maps them over to the map
  // visualization.
  vm.getCustomers = function(){
    Visualization.getCustomers(vm.org, function(customerData){
      
      for (var i in customerData) {
        if(customerData[i] && customerData[i].BillAddr){
          states[customerData[i].BillAddr.CountrySubDivisionCode].numCo++;
        }
      }

      var max = 0;

      for(var key1 in states){
        if(states[key1].numCo>max){
          max =states[key1].numCo;
        }
      }

      var veryhigh = max-Math.floor(max/6);
      var high = max-Math.floor(max/3);
      var middle = max-Math.floor(max/2);
      var low = max-Math.floor(2*max/3);
      var verylow = max-Math.floor(5*max/6);
      for(var key in states){
        var count = states[key].numCo;
        if(count === 0){
          states[key].fillKey = 'none';
        }
        else if(count < verylow){
          states[key].fillKey = 'verylow';
        }
        else if(count < low){
          states[key].fillKey = 'low';
        }
        else if(count < middle){
          states[key].fillKey = 'middle';
        }
        else if(count < high){
          states[key].fillKey = 'high';
        }
        else if(count < veryhigh){
          states[key].fillKey = 'veryhigh';
        }
        else if(count === max){
          states[key].fillKey = 'max';
        }
      }

      var election = new Datamap({
        scope: 'usa',
        element: document.getElementById('map_election'),
        geographyConfig: {
          highlightBorderColor: '#bada55',
          popupTemplate: function(geography, data) {
            return '<div class="maptip tooltip">' + geography.properties.name + '<br> Number of Customers: ' +  data.numCo + '';
          },
          highlightBorderWidth: 1
        },

        fills: {
          'max': '#FF0000',
          'veryhigh': '#FF6F6F',
          'high': '#FF9393',
          'middle': '#FF6666',
          'low': '#FFB7B7',
          'verylow': '#FFDBDB',
          'none': '#EEEEEE',
          defaultFill: '#EEEEEE'
        },
        data: states
      });
      election.labels();
    });
  };
  
  vm.getCustomers();
});