var m = L.map('mapID',{
  center: [38.035, -78.495],
  //maxBounds: [[38.3686,-78.9326],[37.5239,-77.8079]],
  zoom: 11,
  layers: [L.tileLayer.provider("Esri.WorldGrayCanvas")],
  doubleClickZoom: true,
  scrollWheelZoom: false
});

(function () {
  m.addHash({});
  var data={}, layers={}, fills =[
    "rgb(255,0,0)",
  	"rgb(83,142,252)",
  	"rgb(213, 62, 79)",
  	"rgb(84, 39, 136)",
  	"rgb(247,64,247)",
  	"rgb(244, 109, 67)",
  	"rgb(184,225,134)",
  	"rgb(127,188,65)",
  	"rgb(69, 117, 180)"
  ];

  var colorScale = d3.scale.category20();
  var svColorScale = d3.scale.linear().domain([0, 30]).range(["#66FF66","#FF6666"]);

  d3.json("data/rids.json", renderMap);
  d3.json("data/calltimes.json",function(calltimes){
    call_times(calltimes);
    call_volume(calltimes);
  });

  function renderMap(oa){
    data.json = oa;

    var d3Overlay = L.d3SvgOverlay( function(selection,projection){
      selection.selectAll('#mapID circle').data(data.json)
        .enter()
        .append("circle")
        .attr("opacity",0.7)
        .attr("r", function(d){
          var endScale = Math.pow(2, 11-m.getZoom());
          return 1.0*Math.sqrt(d.incidents)*endScale;
        })
        .attr("fill", function(d){
          if(d.averageResponseTime) {
            return svColorScale(d.averageResponseTime);
          }
          return "#ccc"; //there might be no response time if the call was canceled before anyone arrived.
        })
        .attr("cx",function(d){
          var point = projection.latLngToLayerPoint([d.location.latitude, d.location.longitude]);
          return point.x;
        })
        .attr("cy",function(d){
          var point = projection.latLngToLayerPoint([d.location.latitude, d.location.longitude]);
          return point.y;
        });

    }, {zoomAnimate:true});
    d3Overlay.addTo(m);
  }

  window.public = {};
  window.public.data = data;
  window.public.layers = layers;
}());