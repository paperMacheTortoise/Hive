angular.module('visualFactory', ['firebase'])

.factory('Visualization', ['$firebaseArray', '$firebaseObject',function ($firebaseArray, $firebaseObject) {

	var visualFactory = {};

	// Sets the current visualization ID.
	var visualId = '';
	visualFactory.setName = function(name){
		visualId = name;
	};

	// Returns the current visualization ID. 
	visualFactory.getName = function(){
		return visualId;
	};

	// Returns the messages from the db for the current visuatlization.
	visualFactory.getMessages = function(org){
		var ref = new Firebase('https://bizgramer.firebaseio.com/'+org+'/visualizations');
		var messageRef = ref.child('messages');
		messages = $firebaseArray(messageRef);
		return messages;
	};

	// Adds a message to the db about the current visualization.
	visualFactory.addMessage = function(user, profileImg, text, org){
		var ref = new Firebase('https://bizgramer.firebaseio.com/'+org+'/visualizations');
		var messageRef = ref.child('messages');
		messages = $firebaseArray(messageRef);
		messages.$add({
			username: user,
			img: profileImg,
			text: text,
			createdAt: Firebase.ServerValue.TIMESTAMP
		});
	};

	visualFactory.getCustomers = function(callback){
		var ref = new Firebase('https://bizgramer.firebaseio.com/hr/BizData/Customers/0/QueryResponse/Customer');
    	var array = $firebaseObject(ref);
    	array.$loaded().then(function(){
    		callback(array);
    	});
	};

	// visualFactory.getVisualNames = function(org){
	// 	var ref = new Firebase('https://bizgramer.firebaseio.com/'+org+'/visualizations');
	// 	var visuals = $firebaseArray(ref);
	// 	var visualNames = [];
	// 	visuals.$loaded()
	// 		.then(function(){
	// 			angular.forEach(visuals, function(visual){
	// 				visualNames.push(visual.$id);
	// 			});
	// 		});
	// 	return visualNames;
	// };

	// Returns data array of account information
	visualFactory.getVisualData = function(org, account){
		var ref = new Firebase('https://bizgramer.firebaseio.com/'+org+'/BizData/'+account+'/');
		data_array = $firebaseArray(ref);
		return data_array;
	};

	//Function used by the bubble chart to produce and display the tooltip to display
	//account data when user scrolls over the chart bubbles.
	var CustomTooltip = function(tooltipId, width) {

	  var showTooltip = function(content, event) {
	    $("#"+tooltipId).html(content);
	    $("#"+tooltipId).show();

	    updatePosition(event);
	  };
	  
	  var hideTooltip = function() {
	    $("#"+tooltipId).hide();
	  };

	  var updatePosition = function(event) {
	    var ttid = "#"+tooltipId;
	    var xOffset = 10;
	    var yOffset = 5;

	     var ttw = $(ttid).width();
	     var tth = $(ttid).height();
	     var wscrY = $('#svg_vis').scrollTop();
	     var wscrX = $('#svg_vis').scrollLeft();
	     var curX = (document.all) ? event.clientX + wscrX : event.pageX;
	     var curY = (document.all) ? event.clientY + wscrY : event.pageY;
	     var ttleft = ((curX - wscrX + xOffset*2 + ttw) > $('#svg_vis').width()) ? curX - ttw - xOffset*2 : curX + xOffset;
	     if (ttleft < wscrX + xOffset){
	      ttleft = wscrX + xOffset;
	     }
	     var tttop = ((curY - wscrY + yOffset*2 + tth) > $('#svg_vis').height()) ? curY - tth - yOffset*2 : curY + yOffset;
	     if (tttop < wscrY + yOffset){
	      tttop = curY + yOffset;
	     }
	     $(ttid).css('top', tttop + 'px').css('left', ttleft + 'px');
	  };
	  
	  $("#vis").append("<div class='tooltip' id='"+tooltipId+"'></div>");
	  
	  if(width){
	    $("#"+tooltipId).css("width", width);
	  }
	  
	  hideTooltip();

	  return {
	    showTooltip: showTooltip,
	    hideTooltip: hideTooltip,
	    updatePosition: updatePosition
	  };
	};

	//Class definition for the bubble chart.
	visualFactory.BubbleChart = function() {
	  this.width = 740;
	  this.height = 600;
	  this.tooltip = new CustomTooltip("toolTipID", 240);
	  this.center = {
	    x: this.width / 2,
	    y: this.height / 2
	  };
	  this.layout_gravity = -0.01;
	  this.damper = 0.1;
	  this.vis = null;
	  this.nodes = [];
	  this.force = null;
	  this.circles = null;

	};



	//BubbleChart function to set "charge" which determines bubble motion.
	visualFactory.BubbleChart.prototype.charge = function(d) {
	  return -Math.pow(d.radius, 2.0) / 8;
	};

	//BubbleChart function that instantiates the force of the nodes.
	visualFactory.BubbleChart.prototype.start = function() {
	  return this.force = d3.layout.force().nodes(this.nodes).size([this.width, this.height]);
	};

	//BubbleChart function that displays all the groups and move them to the center.
	visualFactory.BubbleChart.prototype.display_group_all = function() {
	  this.force.gravity(this.layout_gravity).charge(this.charge).friction(0.9).on("tick", (function(_this) {
	    return function(e) {
	      return _this.circles.each(_this.move_towards_center(e.alpha)).attr("cx", function(d) {
	        return d.x;
	      }).attr("cy", function(d) {
	        return d.y;
	      });
	    };
	  })(this));
	  this.force.start();
	  return this.hide_due_dates();
	};

	//BubbleChart function that moves the nodes to the center.
	visualFactory.BubbleChart.prototype.move_towards_center = function(alpha) {
	  return (function(_this) {
	    return function(d) {
	      d.x = d.x + (_this.center.x - d.x) * (_this.damper + 0.02) * alpha;
	      return d.y = d.y + (_this.center.y - d.y) * (_this.damper + 0.02) * alpha;
	    };
	  })(this);
	};

	//BubbleChart function that sets up the display and moves bubbles to seperate centers.
	visualFactory.BubbleChart.prototype.display_by_seperated = function() {
	  this.force.gravity(this.layout_gravity).charge(this.charge).friction(0.9).on("tick", (function(_this) {
	    return function(e) {
	      return _this.circles.each(_this.move_towards_seperated(e.alpha))
	        .attr("cx", function(d) {
	          return d.x;
	        }).attr("cy", function(d) {
	          return d.y;
	        });
	    };
	  })(this));
	  this.force.start();
	  return this.display_seperated();
	};

	//BubbleChart function that moves bubbles to seperated centers.
	visualFactory.BubbleChart.prototype.move_towards_seperated = function(alpha) {
	  return (function(_this) {
	    return function(d) {
	      var target;
	      target = _this.due_date_centers[d.days_past_due];
	      d.x = d.x + (target.x - d.x) * (_this.damper + 0.02) * alpha * 1.1;
	      return d.y = d.y + (target.y - d.y) * (_this.damper + 0.02) * alpha * 1.1;
	    };
	  })(this);
	};

	//BubbleChart function that shows the titles in the seperated node display
	visualFactory.BubbleChart.prototype.display_seperated = function() {
	  var past_due_x = {
	    "Less Than 30 Days": 140,
	    "30 to 60 Days": this.width / 2 ,
	    "60 Days or Older": this.width - 160
	  };

	  var past_due_data = d3.keys(past_due_x);

	  var past_due = this.vis.selectAll(".past_due").data(past_due_data);
	  return past_due.enter()
	    .append("text")
	    .attr("class", "past_due")
	    .attr("x", (function() {
	        return function(d) {
	          return past_due_x[d];
	        };
	      })(this))
	    .attr("y", 40)
	    .attr("text-anchor", "middle")
	    .text(function(d) {
	        return d;
	      });
	};

	//BubbleChart function that removes the seperated bubble titles
	visualFactory.BubbleChart.prototype.hide_due_dates = function() {
	  var past_due;
	  return past_due = this.vis.selectAll(".past_due").remove();
	};


	//BubbleChart function that removes tooltip and bubble highlight when mouse leaves the bubble.
	visualFactory.BubbleChart.prototype.hide_details = function(data, i, element) {
	  d3.select(element).attr("stroke", (function(_this) {
	    return function(d) {
	      return d3.rgb(_this.fill_color(d.days_past_due)).darker();
	    };
	  })(this));
	  return this.tooltip.hideTooltip();
	};

	//Function used to add commas in the account data display of amounts.
	visualFactory.BubbleChart.prototype.addCommas = function(nStr) {
	  nStr += '';
	  x = nStr.split('.');
	  x1 = x[0];
	  x2 = x.length > 1 ? '.' + x[1] : '';
	  var rgx = /(\d+)(\d{3})/;

	  while (rgx.test(x1)) {
	    x1 = x1.replace(rgx, '$1' + ',' + '$2');
	  }

	  return x1 + x2;
	};

	return visualFactory;
}]);
