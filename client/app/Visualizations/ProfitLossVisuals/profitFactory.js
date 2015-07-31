angular.module('profitFactory', ['firebase'])

.factory('profitFactory', ['$firebaseArray', function ($firebaseArray){
  var profitFactory = {};

  profitFactory.getVisualData = function(org, account){
    var ref = new Firebase('https://bizgramer.firebaseio.com/'+org+'/BizData/'+account+'/');
    data_array = $firebaseArray(ref);
    return data_array;
  };

  profitFactory.ProfitChart = function(dates) {
    var createLayers = function (dates) {
      layerone = [];
      layertwo = [];
      layerthree = [];
      for(var i = 0; i < dates.length; i++){
        layerone.push(parseInt(dates[i]["Total Cost of Sales"],10));
        layertwo.push(parseInt(dates[i]["Total Expenses"],10));
        layerthree.push(parseInt(dates[i]["Total Income"],10));
      }
      var threelayers = [];
      layerone = layerone.map(function(d, i) { return {x: i, y: d }; });
      layertwo = layertwo.map(function(d, i) { return {x: i, y: d }; });
      layerthree = layerthree.map(function(d, i) { return {x: i, y: d }; });

      threelayers.push(layerone, layertwo, layerthree);

      var stack = d3.layout.stack();
      var layers = stack(threelayers);
      return layers;
    };

    var layers = createLayers(dates);

  var createProfit = function(dates) {
    var profit = [];
    for(var i = 0; i < dates.length; i++){
      profit.push(parseInt(dates[i]["Net Earnings"],10));
    }
    profit = profit.map(function(d, i) { return {x: i, y: d}; });
    return profit;
  };

  var profit = createProfit(dates);

  var n = 3, // number of layers
      m = 11;

  var months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov"];
  var margin = {top: 40, right: 10, bottom: 20, left: 50},
    width = 960 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom;

  var extents = [];
  extents = extents.concat(d3.extent(layers[0].map(function(d) {return d.y; })));
  extents = extents.concat(d3.extent(layers[1].map(function(d) {return d.y; })));
  extents = extents.concat(d3.extent(layers[2].map(function(d) {return d.y; })));
  var yGroupExtents = d3.extent(extents);

  var yScale = d3.scale.linear()
    .domain(yGroupExtents)
    .range([height, 0]);

  var y0 = function() {
    return yScale(0);
  };

  var yAxis = d3.svg.axis().scale(yScale).tickSize(1)
    .tickPadding(0).orient("left");

  var xScale = d3.scale.ordinal().domain(d3.range(m)).rangeRoundBands([0, width], 0.08);
  var xordinal = d3.scale.ordinal().domain(months).rangeRoundBands([0, width], 0.08);
  var xAxis = d3.svg.axis()
    .scale(xordinal)
    .tickSize(1)
    .tickPadding(3)
    .orient("bottom");
  d3.svg.axis()
    .scale(xordinal)
    .tickValues(null)
    .tickSize(1)
    .tickPadding(3)
    .orient("bottom");


  var color = d3.scale.linear()
    .domain([0, n - 1])
    .range(['#FF69B4', "#008000"]);

  var svg = d3.select("#vis").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    svg.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + height + ")")
        .call(xAxis);

    svg.append("line")
        .attr('x1', 0)
        .attr('x2', 960-margin.right)
        .attr('y1', y0())
        .attr('y2', y0())
        .attr("stroke", "black")
        .attr("stroke-width", 1);

    svg.append("g")
        .attr("class", "y axis")
        .call(yAxis);

  function transition(data) {
    var layer = svg.selectAll(".layer")
                .data(data);

      layer.exit().remove();

      layer.enter().append("g")
        .attr("class", "layer")
        .style("fill", function(d, i) { return color(i); });

    var rect = layer.selectAll("rect")
        .data(function(d) { return d; });

        //update the old elements as needed
        rect.attr("x", function(d, i, j) { return xScale(d.x) + xScale.rangeBand() / n * j; })
        .attr("y",  y0(0))
        .attr("width", xScale.rangeBand() / n)
        .attr("height", 0)
      .transition()
        .attr("y", function(d) { return d.y < 0 ? y0() : yScale(d.y); })
        .attr("height", function(d) { return Math.abs( yScale(d.y) - y0() ); });

      rect.exit().remove();

      //create new elements as needed.
      rect.enter().append("rect")
        .attr("x", function(d, i, j) { return xScale(d.x) + xScale.rangeBand() / n * j; })
        .attr("y",  y0(0))
        .attr("width", xScale.rangeBand() / n)
        .attr("height", 0)
      .transition()
        .attr("y", function(d) { return d.y < 0 ? y0() : yScale(d.y); })
        .attr("height", function(d) { return Math.abs( yScale(d.y) - y0() ); });
    }


  var change = function() {

    if(this.value === "grouped") {
      transition(layers);
    }
    else {
      transition([profit]);

    }
  };

  d3.selectAll("input").on("change", change );

  };

  return profitFactory;
}]);
