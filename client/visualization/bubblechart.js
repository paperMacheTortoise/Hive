
var data = [{"DATE":"1985-1-1", "Time":3000, "Radius":84217,"Distance":282919,"Year": 2008},
{"DATE":"1985-2-1","Time":1000, "Radius":55809, "Distance":298124.4,"Year": 2008},
{"DATE":"1985-3-1","Time":2000,"Radius":86364,"Distance":303912.8,"Year": 2008},
{"DATE":"1985-4-1","Time":2700,"Radius":102045,"Distance":316665.7,"Year": 2008},
{"DATE":"1985-5-1","Time":2800,"Radius":115637,"Distance":318817.3,"Year": 2009},
{"DATE":"1985-6-1","Time":7000,"Radius":95645,"Distance":311279.5,"Year": 2009},
{"DATE":"1985-7-1","Time":8000,"Radius":99286,"Distance":321709.3,"Year": 2009},
{"DATE":"1985-8-1","Time":1000,"Radius":96547,"Distance":320373.3,"Year": 2010},
{"DATE":"1985-9-1","Time":500,"Radius":94699,"Distance":301929.8,"Year": 2010},
{"DATE":"1985-10-1","Time":5000,"Radius":100377,"Distance":320287.5,"Year": 2010},
{"DATE":"1985-11-1","Time":50,"Radius":119957,"Distance":308707.3,"Year": 2010}];

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
      this.tooltip = CustomTooltip("tooltip", 240);
      this.center = {
        x: this.width / 2,
        y: this.height / 2
      };
      this.year_centers = {
        "2008": {
          x: this.width / 3,
          y: this.height / 2
        },
        "2009": {
          x: this.width / 2,
          y: this.height / 2
        },
        "2010": {
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
        return parseInt(d.Radius);
      });
      this.fill_color = d3.scale.ordinal().domain(["low", "medium", "high"]).range(["#d84b2a", "#beccae", "#7aa25c"]);
      this.radius_scale = d3.scale.pow().exponent(0.5).domain([0, max_amount]).range([2, 85]);
      this.create_nodes();
      this.create_vis();
    }

    BubbleChart.prototype.create_nodes = function() {
      this.data.forEach((function(_this) {
        return function(d) {
          var node;
          node = {
            Date: d.DATE,
            radius: _this.radius_scale(parseInt(d.Radius)),
            value: d.Radius,
            distance: d.Distance,
            year: d.Year,
            x: Math.random() * 900,
            y: Math.random() * 800
          };
          return _this.nodes.push(node);
        };
      })(this));
      return this.nodes.sort(function(a, b) {
        return b.value - a.value;
      });
    };

    BubbleChart.prototype.create_vis = function() {
      var that;
      this.vis = d3.select("#vis").append("svg").attr("width", this.width).attr("height", this.height).attr("id", "svg_vis");
      this.circles = this.vis.selectAll("circle").data(this.nodes, function(d) {
        return d.Date;
      });
      that = this;
      this.circles.enter().append("circle").attr("r", 0).attr("fill", (function(_this) {
        return function(d) {
          return _this.fill_color(d.group);
        };
      })(this)).attr("stroke-width", 2).attr("stroke", (function(_this) {
        return function(d) {
          return d3.rgb(_this.fill_color(d.group)).darker();
        };
      })(this)).attr("Date", function(d) {
        return "bubble_" + d.Date;
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
          target = _this.year_centers[d.year];
          d.x = d.x + (target.x - d.x) * (_this.damper + 0.02) * alpha * 1.1;
          return d.y = d.y + (target.y - d.y) * (_this.damper + 0.02) * alpha * 1.1;
        };
      })(this);
    };

    BubbleChart.prototype.display_years = function() {
      var years, years_data, years_x;
      years_x = {
        "First": 160,
        "Middle": this.width / 2,
        "Last": this.width - 160
      };
      years_data = d3.keys(years_x);
      years = this.vis.selectAll(".years").data(years_data);
      return years.enter().append("text").attr("class", "years").attr("x", (function(_this) {
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
      content = "<span class=\"name\">Title:</span><span class=\"value\"> " + data.Date + "</span><br/>";
      content += "<span class=\"name\">Amount:</span><span class=\"value\"> $" + (addCommas(data.value)) + "</span><br/>";
      content += "<span class=\"name\">Year:</span><span class=\"value\"> " + data.year + "</span>";
      return this.tooltip.showTooltip(content, d3.event);
    };

    BubbleChart.prototype.hide_details = function(data, i, element) {
      d3.select(element).attr("stroke", (function(_this) {
        return function(d) {
          return d3.rgb(_this.fill_color(d.group)).darker();
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
      return root.display_all();
    };
    root.display_all = (function(_this) {
      return function() {
        return chart.display_group_all();
      };
    })(this);
    root.display_year = (function(_this) {
      return function() {
        return chart.display_by_year();
      };
    })(this);
    root.toggle_view = (function(_this) {
      return function(view_type) {
        if (view_type === 'year') {
          return root.display_year();
        } else {
          return root.display_all();
        }
      };
    })(this);
    return render_vis(data);
  });

}).call(this);