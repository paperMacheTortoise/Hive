angular.module('aPVisualCtrl', [])

.controller('aPVisualController', function (Visualization, $rootScope, $stateParams) {

	var vm = this;

	// CHAT FUNCTIONS
  // Get ther current user;
	vm.org = $stateParams.org;
	//chat functions
	vm.username = $rootScope.logInfo.username;
  // TO DO, set the visualization identifier
	vm.visualId = 'visual1';

  var APBubbleChart = function(data){
    Visualization.BubbleChart.call(this);
    var max_amount;
    this.data = data;
    this.due_date_centers = {
      "1 - 30 days past due": {
        x: this.width / 3,
        y: this.height / 2
      },
      "31 - 60 days past due": {
        x: this.width / 2,
        y: this.height / 2
      },
      "61 or more days past due": {
        x: 2 * this.width / 3,
        y: this.height / 2
      }
    };
    max_amount = d3.max(this.data, function(d) {
      return parseInt(d.amount);
    });
    this.fill_color = d3.scale.ordinal().domain(["1 - 30 days past due","31 - 60 days past due","61 or more days past due"]).range(["#16A79D", "#F4AC42", "#80628B"]);
    this.radius_scale = d3.scale.pow().exponent(0.5).domain([0, max_amount]).range([2, 85]);
    this.create_nodes();
    console.log(this.nodes);
    this.create_vis();
    this.start();
    this.display_group_all();
  };

  APBubbleChart.prototype = Object.create(Visualization.BubbleChart.prototype);
  APBubbleChart.prototype.constructor = APBubbleChart;

  //BubbleChart function to create nodes from data.
  APBubbleChart.prototype.create_nodes = function() {
    this.data.forEach((function(_this) {
      return function(d) {
        var node;
        node = {
          vendor: d.vendor,
          vendor_id: d.vendor_id,
          radius: _this.radius_scale(parseInt(d.amount)),
          amount: +d.amount,
          open_balance: d.open_balance,
          days_past_due: d.days_past_due,
          due_date: d.due_date,
          bill_num: d.bill_num,
          billed_date: d.billed_date,
          past_due: d.past_due,
          x: Math.random() * 900,
          y: Math.random() * 800
        };
        //console.log(node);
        return _this.nodes.push(node);
      };
    })(this));
    return this.nodes.sort(function(a, b) {
      return b.amount - a.amount;
    });
  };

  //BubbleChart function to create D3 visualization of each created node.  It
  //also gives it the scroll over functions of displaying tooltips.
  APBubbleChart.prototype.create_vis = function() {
    var that;
    this.vis = d3.select("#vis").append("svg").attr("width", this.width).attr("height", this.height).attr("id", "svg_vis");
    this.circles = this.vis.selectAll("circle").data(this.nodes, function(d) {
      return d.vendor;
    });
    that = this;
    this.circles.enter().append("circle").attr("r", 0).attr("fill", (function(_this) {
      return function(d) {
        return _this.fill_color(d.days_past_due);
      };
    })(this)).attr("stroke-width", 2).attr("stroke", (function(_this) {
      return function(d) {
        return d3.rgb(_this.fill_color(d.days_past_due)).darker();
      };
    })(this)).attr("title", function(d) {
      return "bubble_" + d.vendor_id;
    }).on("mouseover", function(d, i) {
      return that.show_details(d, i, this);
    }).on("mouseout", function(d, i) {
      return that.hide_details(d, i, this);
    });
    return this.circles.transition().duration(2000).attr("r", function(d) {
      return d.radius;
    });
  };

  //BubbleChart function that displays the tooltip and highlights the bubble when mouseover.
  APBubbleChart.prototype.show_details = function(data, i, element) {
    var content;
    d3.select(element).attr("stroke", "black");
    content = "<span class=\"name\">Vendor:</span><span class=\"value\"> " + data.vendor + "</span><br/>";
    content += "<span class=\"name\">Vendor ID:</span><span class=\"value\"> " + data.vendor_id + "</span><br/>";
    content += "<span class=\"name\">Amount:</span><span class=\"value\"> $" + (this.addCommas(data.amount)) + "</span><br/>";
    content += "<span class=\"name\">Due Date:</span><span class=\"value\"> " + data.due_date + "</span><br/>";
    //content += "<span class=\"name\">Bill Number:</span><span class=\"value\"> " + data.bill_num + "</span><br/>";
    content += "<span class=\"name\">Bill Date:</span><span class=\"value\"> " + data.billed_date + "</span><br/>";
    return this.tooltip.showTooltip(content, d3.event);
  };

  //Instantiates a bubblechart with data.
  var chart = null;
  var visual_data = Visualization.getVisualData(vm.org, "Payables");
  chart = visual_data.$loaded(function(){
    var chart = new APBubbleChart(visual_data);

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
