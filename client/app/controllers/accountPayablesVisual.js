angular.module('accountPayablesVisualCtrl', [])

.controller('accountPayableVisualController', function (Visualization, $rootScope, $stateParams){

	var vm = this;

	// CHAT FUNCTIONS
  // Get ther current user;
	vm.org = $stateParams.org;
	//chat functions
	vm.username = $rootScope.logInfo.username;
  // TO DO, set the visualization identifier
	vm.visualId = 'visual1';
  Visualization.setName(vm.visualId);
  // Gets the messages for the visualization.
	vm.messages = Visualization.getMessages(vm.visualId, vm.org);

  vm.addMessage = function (e) {
    if(e.keyCode === 13){
      Visualization.addMessage(vm.username, vm.visualId, vm.text, vm.org);
      vm.text = '';
    }
  };

  //Instantiates a bubblechart with data.
  var chart = null;
  var visual_data = Visualization.getVisualData(vm.org, "Payables");
  chart = visual_data.$loaded(function(){
    var chart = new Visualization.BubbleChart(visual_data);
    chart.start();
    chart.display_group_all();

    //Adds functionality to the view_selection buttons to seperate and unseperate bubbles
    $('#view_selection a').click(function() {
      var view_type = $(this).attr('id');
      $('#view_selection a').removeClass('active');
      $(this).toggleClass('active');

      if (view_type === 'seperate') {
        chart.display_by_seperated();
      } else {
        chart.display_group_all();
      }
    });
    return chart;
  });

});
