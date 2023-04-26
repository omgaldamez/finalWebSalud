d3.svg("svg/Arrow_S1vsS2.svg").then(function (datossvg) {
  d3.select(".grafico").node().append(datossvg.documentElement);
});

d3.svg("svg/SVG_GASTOP.svg").then(function (datossvg) {
  d3.select(".graficoMexS").node().append(datossvg.documentElement);
});

d3.svg("svg/SVG_GASTOP.svg").then(function (datossvg) {
  d3.selectAll("#FondoTestS rect").style("fill", "none").style("stroke","none");
  d3.selectAll("#ANIO tspan").style("fill", "none");
  d3.selectAll("#ANIO text").style("fill", "none");
  d3.selectAll("#ANIO path").style("stroke", "none");
  d3.selectAll("#ENTIDAD tspan").style("fill", "none");
  d3.selectAll("#ENTIDAD text").style("fill", "none");
  d3.selectAll("#NUM text").style("fill", "none");
  d3.selectAll("#infoHover text").style("fill", "none");
  d3.selectAll("#variables text").style("fill", "none");

  d3.selectAll("#HEATS path").attr("data-x", function() {
    var d = d3.select(this).attr("d");
    var match = /M([\d.]+),([\d.]+)/.exec(d);
    return match ? match[1] : null;
  })
  .attr("data-y", function() {
    var d = d3.select(this).attr("d");
    var match = /M([\d.]+),([\d.]+)/.exec(d);
    return match ? match[2] : null;
  });




  
});

