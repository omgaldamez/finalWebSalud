d3.svg("svg/Arrow_Sexenio_rev.svg").then(function (datossvg) {
  d3.select(".grafico").node().append(datossvg.documentElement);



 
});

d3.svg("svg/SVG_GASTO.svg").then(function (datossvg) {
  d3.select(".graficoMexS").node().append(datossvg.documentElement);
});

d3.svg("svg/SVG_GASTO.svg").then(function (datossvg) {
  d3.selectAll(".x path").style("fill", "none");
  d3.selectAll(".azules path").style("fill", "none");
  d3.selectAll(".DOTS path").style("fill", "none");
  d3.selectAll(".textoANIO tspan").style("fill", "none");
  d3.selectAll(".textos tspan").style("fill", "none");
  d3.selectAll("#NUM textPath").attr("startOffset", "40%");
  d3.selectAll(".infoHover text").style("fill", "none");
  d3.selectAll(".infoError text").style("fill", "none");
});