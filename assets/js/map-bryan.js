function createMap(lat, long, sca, container, w, h) {
  
  console.log(container);
  
  const svg = 
  d3.select("div#" + container)
    .append("svg")
    .attr("preserveAspectRatio", "xMinYMin meet")
    .style("background-color", "#333333")
    .attr("viewBox", "0 0 " + w + " " + h)
    .style("display", "flex")
    .classed("svg-content", true);

  const projection = 
    d3.geoMercator()
    .translate([w / 2, h / 2])
    .scale(sca)
    .center([lat, long]);

  const path = 
    d3.geoPath()
    .projection(projection);

  // load data  
  var worldmap = d3.json("/assets/data/countries.geojson");

  Promise.all([worldmap]).then(function (values) {
    // draw map
    svg.selectAll("path")
      .data(values[0].features)
      .enter()
      .append("path")
      .attr("class", "continent")
      .attr("d", path)
  });
}


createMap(5, 46, 2500, "map1", 1400, 700);
createMap(-61, 15.5, 15000, "map2", 1400, 700);
createMap(-54, 4.2, 5000, "map3", 1400, 700);
createMap(55.5, -21.2, 30000, "map4", 1400, 700);
createMap(45, -12.8, 40000, "map5", 1400, 700);