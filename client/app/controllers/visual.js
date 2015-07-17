angular.module('visualCtrl', [])

.controller('visualController', function (Visualization, Replies, $rootScope){

	var vm = this;

	//chat functions
	vm.username = $rootScope.logInfo.username;
	vm.visualId = 'visual1';
	vm.messages = Visualization.getMessages(vm.visualId);

  $('#view_selection a').click(function() {
        var view_type = $(this).attr('id');
        $('#view_selection a').removeClass('active');
        $(this).toggleClass('active');
        vm.toggle_view(view_type);
        return false;
      });

	vm.addMessage = function (e) {
		if(e.keyCode === 13){
			Visualization.addMessage(vm.username, vm.visualId, vm.text);
			vm.text = '';
		}
	};


	// replies
	vm.isReplying = false;
	
	vm.toggleReplying = function(){
		vm.isReplying = !vm.isReplying;
	};

	vm.addVisualReply = function (e, index) {
		if(e.keyCode === 13) {
			Replies.addVisualReply(vm.username, vm.replyText, index, vm.visualId);
			vm.replyText = '';
		}
	};

  function customTooltip(tooltipId, width){
 
    $("body").append("<div class='tooltip' id='"+tooltipId+"'></div>");
    
    if(width){
      $("#"+tooltipId).css("width", width);
    }
    
    function showTooltip(content, event){
      $("#"+tooltipId).html(content);
      $("#"+tooltipId).show();
      updatePosition(event);
    }
    
    function hideTooltip(){
      $("#"+tooltipId).hide();
    }
    
    hideTooltip();

    function updatePosition(event){
      var ttid = "#"+tooltipId;
      var xOffset = 20;
      var yOffset = 10;
      
       var ttw = $(ttid).width();
       var tth = $(ttid).height();
       var wscrY = $(window).scrollTop();
       var wscrX = $(window).scrollLeft();
       var curX = (document.all) ? event.clientX + wscrX : event.pageX;
       var curY = (document.all) ? event.clientY + wscrY : event.pageY;
       var ttleft = ((curX - wscrX + xOffset*2 + ttw) > $(window).width()) ? curX - ttw - xOffset*2 : curX + xOffset;
       if (ttleft < wscrX + xOffset){
        ttleft = wscrX + xOffset;
       } 
       var tttop = ((curY - wscrY + yOffset*2 + tth) > $(window).height()) ? curY - tth - yOffset*2 : curY + yOffset;
       if (tttop < wscrY + yOffset){
        tttop = curY + yOffset;
       } 
       $(ttid).css('top', tttop + 'px').css('left', ttleft + 'px');
    }
    
    return {
      showTooltip: showTooltip,
      hideTooltip: hideTooltip,
      updatePosition: updatePosition
    };
  }

  function addCommas(nStr)
  {
    nStr += '';
    x = nStr.split('.');
    x1 = x[0];
    x2 = x.length > 1 ? '.' + x[1] : '';
    var rgx = /(\d+)(\d{3})/;
    while (rgx.test(x1)) {
      x1 = x1.replace(rgx, '$1' + ',' + '$2');
    }
    return x1 + x2;
  }


(function() {
  var BubbleChart, root,
    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

  BubbleChart = (function() {
    function BubbleChart(data) {
      this.hide_details = __bind(this.hide_details, this);
      this.show_details = __bind(this.show_details, this);
      this.hide_years = __bind(this.hide_years, this);
      this.display_years = __bind(this.display_years, this);
      this.move_towards_year = __bind(this.move_towards_year, this);
      this.display_by_year = __bind(this.display_by_year, this);
      this.move_towards_center = __bind(this.move_towards_center, this);
      this.display_group_all = __bind(this.display_group_all, this);
      this.start = __bind(this.start, this);
      this.create_vis = __bind(this.create_vis, this);
      this.create_nodes = __bind(this.create_nodes, this);
      var max_amount;
      this.data = data;
      this.width = 940;
      this.height = 600;
      this.tooltip = customTooltip("toolTipID", 240);
      this.center = {
        x: this.width / 2,
        y: this.height / 2
      };
      this.year_centers = {
        "1 - 30 days past due": {
          x: this.width / 3,
          y: this.height / 2
        },
        "31 - 60 days past due": {
          x: this.width / 2,
          y: this.height / 2
        },
        "61 - 90 days past due": {
          x: 2 * this.width / 3,
          y: this.height / 2
        }
      };
      this.layout_gravity = -0.01;
      this.damper = 0.1;
      this.vis = null;
      this.nodes = [];
      this.force = null;
      this.circles = null;
      max_amount = d3.max(this.data, function(d) {
        return parseInt(d.amount);
      });
      this.fill_color = d3.scale.ordinal().domain(["1 - 30 days past due","31 - 60 days past due","61 - 90 days past due"]).range(["green", "blue", "red"]);
      this.radius_scale = d3.scale.pow().exponent(0.5).domain([0, max_amount]).range([2, 85]);
      this.create_nodes();
      this.create_vis();
    }

    BubbleChart.prototype.create_nodes = function() {
      this.data.forEach((function(_this) {
        return function(d) {
          var node;
          node = {
            client: d.client,
            client_id: d.client_id,
            radius: _this.radius_scale(parseInt(d.amount)),
            amount: +d.amount,
            open_balance: d.open_balance,
            days_past_due: d.days_past_due,
            due_date: d.due_date,
            invoice_num: d.invoice_num,
            invoice_date: d.invoice_date,
            x: Math.random() * 900,
            y: Math.random() * 800
          };
          return _this.nodes.push(node);
        };
      })(this));
      return this.nodes.sort(function(a, b) {
        return b.amount - a.amount;
      });
    };

    BubbleChart.prototype.create_vis = function() {
      var that;
      this.vis = d3.select("#vis").append("svg").attr("width", this.width).attr("height", this.height).attr("id", "svg_vis");
      this.circles = this.vis.selectAll("circle").data(this.nodes, function(d) {
        return d.client;
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
        return "bubble_" + d.client_id;
      }).on("mouseover", function(d, i) {
        return that.show_details(d, i, this);
      }).on("mouseout", function(d, i) {
        return that.hide_details(d, i, this);
      });
      return this.circles.transition().duration(2000).attr("r", function(d) {
        return d.radius;
      });
    };

    BubbleChart.prototype.charge = function(d) {
      return -Math.pow(d.radius, 2.0) / 8;
    };

    BubbleChart.prototype.start = function() {
      return this.force = d3.layout.force().nodes(this.nodes).size([this.width, this.height]);
    };

    BubbleChart.prototype.display_group_all = function() {
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
      return this.hide_years();
    };

    BubbleChart.prototype.move_towards_center = function(alpha) {
      return (function(_this) {
        return function(d) {
          d.x = d.x + (_this.center.x - d.x) * (_this.damper + 0.02) * alpha;
          return d.y = d.y + (_this.center.y - d.y) * (_this.damper + 0.02) * alpha;
        };
      })(this);
    };

    BubbleChart.prototype.display_by_year = function() {
      this.force.gravity(this.layout_gravity).charge(this.charge).friction(0.9).on("tick", (function(_this) {
        return function(e) {
          return _this.circles.each(_this.move_towards_year(e.alpha)).attr("cx", function(d) {
            return d.x;
          }).attr("cy", function(d) {
            return d.y;
          });
        };
      })(this));
      this.force.start();
      return this.display_years();
    };

    BubbleChart.prototype.move_towards_year = function(alpha) {
      return (function(_this) {
        return function(d) {
          var target;
          target = _this.year_centers[d.days_past_due];
          d.x = d.x + (target.x - d.x) * (_this.damper + 0.02) * alpha * 1.1;
          return d.y = d.y + (target.y - d.y) * (_this.damper + 0.02) * alpha * 1.1;
        };
      })(this);
    };

    BubbleChart.prototype.display_years = function() {
      var years, years_data, years_x;
      years_x = {
        "Less Than 30 Days": 240,
        "30 to 60 Days": this.width / 2 + 100,
        "60 Days or Older": this.width - 160
      };
      years_data = d3.keys(years_x);
      years = this.vis.selectAll(".years").data(years_data);
      return years.enter().append("text").attr("class", "years").attr("x", (function() {
        return function(d) {
          return years_x[d];
        };
      })(this)).attr("y", 40).attr("text-anchor", "middle").text(function(d) {
        return d;
      });
    };

    BubbleChart.prototype.hide_years = function() {
      var years;
      return years = this.vis.selectAll(".years").remove();
    };

    BubbleChart.prototype.show_details = function(data, i, element) {
      var content;
      d3.select(element).attr("stroke", "black");
      content = "<span class=\"name\">Client:</span><span class=\"value\"> " + data.client + "</span><br/>";
      content += "<span class=\"name\">Client ID:</span><span class=\"value\"> " + data.client_id + "</span><br/>";
      content += "<span class=\"name\">Amount:</span><span class=\"value\"> $" + (addCommas(data.amount)) + "</span><br/>";
      content += "<span class=\"name\">Due Date:</span><span class=\"value\"> " + data.due_date + "</span><br/>";
      content += "<span class=\"name\">Invoice Number:</span><span class=\"value\"> " + data.invoice_num + "</span><br/>";
      content += "<span class=\"name\">Invoice Date:</span><span class=\"value\"> " + data.invoice_date + "</span><br/>";
      return this.tooltip.showTooltip(content, d3.event);
    };

    BubbleChart.prototype.hide_details = function(data, i, element) {
      d3.select(element).attr("stroke", (function(_this) {
        return function(d) {
          return d3.rgb(_this.fill_color(d.days_past_due)).darker();
        };
      })(this));
      return this.tooltip.hideTooltip();
    };

    return BubbleChart;

  })();

  root = typeof exports !== "undefined" && exports !== null ? exports : this;

  $(function() {
    var chart, render_vis;
    chart = null;
    render_vis = function(data) {
      chart = new BubbleChart(data);
      chart.start();
      return vm.display_all();
    };
    vm.display_all = (function() {
      return function() {
        return chart.display_group_all();
      };
    })(this);
    vm.display_year = (function() {
      return function() {
        return chart.display_by_year();
      };
    })(this);
    vm.toggle_view = (function() {
      return function(view_type) {
        if (view_type === 'year') {
          return vm.display_year();
        } else {
          return vm.display_all();
        }
      };
    })(this);
    return render_vis(testData);
  });

}).call(this);

});