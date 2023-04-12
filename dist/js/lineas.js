d3.svg("svg/Arrow_Sexenio_rev.svg").then(function (datossvg) {
  d3.select(".grafico").node().append(datossvg.documentElement);
});
