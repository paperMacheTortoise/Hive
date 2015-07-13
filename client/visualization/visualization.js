
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


// var svg = d3.select("body");
// console.log(svg);


// var circles = svg.selectAll("div").data(data)
//     .enter().append("div")
//     .text(function(d){return d.DATE})
//     .attr("fill","blue").attr("r", function(d) { return d.Radius/1000; })
//     .transition().duration(function(d){return d.Time}).style("color","red");

// // var circle = svg.selectAll("circle")
// //     .data(data)

//var data = [4, 8, 15, 16, 23, 42];

var x = d3.scale.linear()
    .domain([0, d3.max(data, function(d) { return d.Distance; })])
    .range([0, 420]);

d3.select(".chart")
  .selectAll("div")
    .data(data)
  .enter().append("div")
    .style("width", function(d) { return x(d.Radius) + "px"; })
    .text(function(d) { return d.DATE; })
    .transition().duration(function(d) {return d.Time}).style("background-color","red")
    .style("width", function(d) { return x(d.Distance) + "px"; });
