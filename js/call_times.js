function call_times(calltimes){
  var margin = {top: 20, right: 60, bottom: 60, left: 60};
  var width = $('#dispatch').width() - margin.left - margin.right;
  var height = 200 - margin.top - margin.bottom;

  calltimesByTime = _.compact(_.map(calltimes,function(calltime){
    if(calltime[1] === null) return null;
    //if(calltime[1] > 1000 || calltime[1] < 0) return null; // remove outliers
    var m = moment(calltime[0]);
    
    m.year(2015);
    m.month(0);
    m.date(1);
    
    return [m.toDate(), calltime[1], calltime[2] ];
  }));

  var x = d3.time.scale()
            .domain([new Date('2015-01-01T00:00:00-05:00'), new Date('2015-01-01T23:59:59-05:00')])
            .range([ 0, width ]);

  var y = d3.scale.linear()
          .domain([0,120])
          .range([ 2*height, 0 ]);

  var y_dispatch = d3.scale.linear()
          .domain([0,2])
          .range([ height, 0 ]);

  var chart_dispatch = d3.select('#dispatch')
    .append('svg:svg')
    .attr('width', width + margin.right + margin.left)
    .attr('height', height + margin.top + margin.bottom)
    .attr('class', 'chart');
  var chart = d3.select('#arrival')
    .append('svg:svg')
    .attr('width', width + margin.right + margin.left)
    .attr('height', 2*height + margin.top + margin.bottom)
    .attr('class', 'chart');


  var main_dispatch = chart_dispatch.append('g')
    .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')')
    .attr('width', width)
    .attr('height', height)
    .attr('class', 'main');
  var main = chart.append('g')
    .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')')
    .attr('width', width)
    .attr('height', 2*height)
    .attr('class', 'main');

  // draw the x axis
  var xAxis = d3.svg.axis()
    .scale(x)
    .orient('bottom')
    .ticks(d3.time.hours, 2)
    .tickFormat(d3.time.format('%-I%p'));

  main_dispatch.append('g')
    .attr('transform', 'translate(0,' + height + ')')
    .attr('class', 'main axis date')
    .call(xAxis);
  main.append('g')
    .attr('transform', 'translate(0,' + 2*height + ')')
    .attr('class', 'main axis date')
    .call(xAxis);

  // draw the y axis
  var yAxis_dispatch = d3.svg.axis()
    .scale(y_dispatch)
    .orient('left')
    .ticks(2);
  var yAxis = d3.svg.axis()
    .scale(y)
    .orient('left');

  main_dispatch.append("text")
    .attr("class", "y label")
    .attr("text-anchor", "end")
    .attr("y", -50)
    .attr("x", -10)
    .attr("dy", ".75em")
    .attr("transform", "rotate(-90)")
    .text("time to dispatch (min)");

  main.append("text")
    .attr("class", "y label")
    .attr("text-anchor", "end")
    .attr("y", -50)
    .attr("x", -10-height/2)
    .attr("dy", ".75em")
    .attr("transform", "rotate(-90)")
    .text("time to arrival (min)");

  main_dispatch.append('g')
    .attr('transform', 'translate(0,0)')
    .attr('class', 'main axis date')
    .call(yAxis_dispatch);

  main.append('g')
    .attr('transform', 'translate(0,0)')
    .attr('class', 'main axis date')
    .call(yAxis);


  var g = main.append("svg:g"); 
  var g_dispatch = main_dispatch.append("svg:g"); 

  var svColorScale = d3.scale.linear().domain([0, 30]).range(["#66FF66","#FF6666"]);
  g.selectAll("scatter-dots")
    .data(calltimesByTime)
    .enter().append("svg:circle")
        .attr("cx", function (d,i) { return x(d[0]); } )
        .attr("cy", function (d) { return y(d[2]); } )
        .attr("r", 1)
        .attr("fill", function(d){
          return svColorScale(d[2]);
        })
        .attr("opacity",0.6);
  g_dispatch.selectAll("scatter-dots")
    .data(calltimesByTime)
    .enter().append("svg:circle")
        .attr("cx", function (d,i) { return x(d[0]); } )
        .attr("cy", function (d) { return y_dispatch(d[1]); } )
        .attr("r", 1)
        .attr("fill","#88cccc")
        .attr("opacity",0.2);
}