function call_volume(calltimes){
  var margin = {top: 20, right: 60, bottom: 60, left: 60};
  var width = $('#dispatch').width() - margin.left - margin.right;
  var height = 200 - margin.top - margin.bottom;

  var calltimeExtent = d3.extent(calltimes,function(c){ return c[0]; });
  var nDays = moment.duration( moment(calltimeExtent[1]).diff( moment(calltimeExtent[0]) ) ).asDays();

  calltimesWithResponse = _.filter(calltimes,function(calltime){
    return (calltime[1] === null);
  });

  calltimesGrouped = _.countBy(calltimes, function(calltime){
    var m = moment(calltime[0]);

    // crazy rounding trick for 15 minutes
    var ROUNDING = 15 * 60 * 1000; /*ms*/
    m = moment(Math.ceil((+m) / ROUNDING) * ROUNDING);

    return m.format("HH:mm");
  });
  calltimesWithResponseGrouped = _.countBy(calltimesWithResponse, function(calltime){
    var m = moment(calltime[0]);

    // crazy rounding trick for 15 minutes
    var ROUNDING = 15 * 60 * 1000; /*ms*/
    m = moment(Math.ceil((+m) / ROUNDING) * ROUNDING);

    return m.format("HH:mm");
  });

  var dataset = _.map(_.keys(calltimesGrouped),function(time){
    return [new Date("2015-01-01T"+time+":00-05:00"), calltimesGrouped[time] * (345 / nDays), calltimesWithResponseGrouped[time] * (345 / nDays)];
  });

  var x = d3.time.scale()
    //.domain(d3.extent(calltimesGrouped, function(d) { return d[0]; }))
    .domain([new Date('2015-01-01T00:00:00-05:00'), new Date('2015-01-01T23:59:59-05:00')])
    .range([ 0, width ]);

  var y = d3.scale.linear()
          .domain([0,300])
          .range([ height, 0 ]);

  var chart = d3.select('#callVolume')
    .append('svg:svg')
    .attr('width', width + margin.right + margin.left)
    .attr('height', height + margin.top + margin.bottom)
    .attr('class', 'chart');

  var main = chart.append('g')
    .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')')
    .attr('width', width)
    .attr('height', height)
    .attr('class', 'main');
      
  // draw the x axis
  var xAxis = d3.svg.axis()
    .scale(x)
    .orient('bottom')
    .ticks(d3.time.hours, 2)
    .tickFormat(d3.time.format('%-I%p'));

  main.append('g')
    .attr('transform', 'translate(0,' + height + ')')
    .attr('class', 'main axis date')
    .call(xAxis);

  // draw the y axis
  var yAxis = d3.svg.axis()
    .scale(y)
    .orient('left')
    .ticks(5);

  main.append("text")
    .attr("class", "y label")
    .attr("text-anchor", "end")
    .attr("y", -60)
    .attr("x", -10)
    .attr("dy", ".75em")
    .attr("transform", "rotate(-90)")
    .text("call volume (calls per year)");

  main.append('g')
    .attr('transform', 'translate(0,0)')
    .attr('class', 'main axis date')
    .call(yAxis);

  var g = main.append("svg:g"); 

  g.selectAll("volbar")
    .data(dataset)
    .enter()
    .append("svg:rect")
      .attr("x",      function(d){ return x(d[0]); } )
      .attr("y",      function(d){ return y(d[1]);} )
      .attr("height", function(d){ return height - y(d[1]);} )
      .attr("width", width/dataset.length)
      .attr("fill","#cccccc")
      .attr("opacity",0.8);
   g.selectAll("volbar2")
    .data(dataset)
    .enter()
    .append("svg:rect")
      .attr("x",      function(d){ return x(d[0]); } )
      .attr("y",      function(d){ return y(d[2]);} )
      .attr("height", function(d){ return height - y(d[2]);} )
      .attr("width", width/dataset.length)
      .attr("fill","#88cccc")
      .attr("opacity",0.8);
}