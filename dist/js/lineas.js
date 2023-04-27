d3.svg("svg/Arrow_S1vsS2.svg").then(function (datossvg) {
  d3.select(".grafico").node().append(datossvg.documentElement);
});

d3.svg("svg/MEX.svg").then(function (datossvg) {
  d3.select(".graficoMAPA").node().append(datossvg.documentElement);
  d3.select(".graficoMAPA rect").style("stroke","none");
  d3.selectAll("#infoHoverMapa text").style("fill","none");
});

d3.svg("svg/SVG_GASTOP.svg").then(function (datossvg) {
  d3.select(".graficoMexS").node().append(datossvg.documentElement);
  
  d3.select("#FondoTestS rect").style("fill", "none").style("stroke","none");
  d3.selectAll("#ANIO tspan").style("fill", "none");
  d3.selectAll("#ANIO text").style("fill", "none");
  d3.selectAll("#ANIO path").style("stroke", "none");
  d3.selectAll("#ENTIDAD tspan").style("fill", "none");
  d3.selectAll("#ENTIDAD text").style("fill", "none");
  d3.selectAll("#NUM text").style("fill", "none");
  d3.selectAll("#infoHover text").style("fill", "none");
  d3.selectAll("#variables text").style("fill", "none");
d3.selectAll("#leyendaHeatsRect").style("display","none");
d3.selectAll("#leyendaAzul").style("display","none");

});

