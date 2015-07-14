
var data = [{"DATE":"1985-1-1", "Time":3000, "Radius":84217,"Distance":282919},
{"DATE":"1985-2-1","Time":1000, "Radius":59015, "Distance":298124.4},
{"DATE":"1985-3-1","Time":2000,"Radius":86364,"Distance":303912.8},
{"DATE":"1985-4-1","Time":2700,"Radius":102045,"Distance":316665.7},
{"DATE":"1985-5-1","Time":2800,"Radius":115637,"Distance":318817.3},
{"DATE":"1985-6-1","Time":7000,"Radius":95645,"Distance":311279.5},
{"DATE":"1985-7-1","Time":8000,"Radius":99286,"Distance":321709.3},
{"DATE":"1985-8-1","Time":1000,"Radius":96547,"Distance":320373.3},
{"DATE":"1985-9-1","Time":500,"Radius":94646,"Distance":301929.8},
{"DATE":"1985-10-1","Time":5000,"Radius":100377,"Distance":320287.5},
{"DATE":"1985-11-1","Time":50,"Radius":119957,"Distance":308707.3}];

var margin = {top: 30, right: 30, bottom: 30, left: 50},
    width = 960 - margin.left - margin.right,
    height = 700 - margin.top - margin.bottom;

var x = d3.scale.ordinal()
    .rangeRoundBands([0, width], .1);

var y = d3.scale.linear()
    .range([height, 0]);

var xAxis = d3.svg.axis()
    .scale(x)
    .orient("bottom");

var yAxis = d3.svg.axis()
    .scale(y)
    .orient("left");

var chart = d3.select(".chart")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

x.domain(data.map(function(d) { return d.DATE; }));
  
y.domain([0, d3.max(data, function(d) { return d.Distance; })]);

  chart.append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(0," + height + ")")
      .call(xAxis);

  chart.append("g")
      .attr("class", "y axis")
      .call(yAxis);

  chart.append("g")
      .attr("class", "y axis")
      .call(yAxis)
    .append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 6)
      .attr("dy", ".71em")
      .style("text-anchor", "end")
      .text("Volume");

  chart.selectAll(".bar")
      .data(data)
    .enter().append("rect")
      .attr("class", "bar")
      .attr("x", function(d) { return x(d.DATE); })
      .attr("y", function(d) { return y(d.Distance); })
      .attr("height", function(d) { return height - y(d.Distance); })
      .attr("width", x.rangeBand())
      .transition().duration(function(d) {return d.Time})
      .attr("y", function(d) { return y(d.Radius); })
      .attr("height", function(d) { return height - y(d.Radius); })
      .style("fill", "red")
      
    d3.selectAll(".bar").on('mouseover', function (data) {
        dynamicColor = this.style.fill;
        d3.select(this)
            .style('fill', '#3c763d')
        	.transition().duration(1000)
        	.attr("y", function(d) { return y(d.Distance); })
      		.attr("height", function(d) { return height - y(d.Distance); })
    	})
 	   .on('mouseout', function (data) {
        d3.select(this)
            .style('fill', dynamicColor)
          	.transition().duration(3000)
          	.attr("y", function(d) { return y(d.Radius); })
        		.attr("height", function(d) { return height - y(d.Radius); })
        });
