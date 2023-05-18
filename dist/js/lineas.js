
//Condiciones Iniciales Intro
d3.select(".introGasto")
.append("img")
.attr("src", "svg/IntroGasto.png")
.style("object-fit", "contain")
.style("column-span", "all");


//Condiciones Iniciales Arrow
d3.svg("svg/Arrow_S1vsS2.svg").then(function (datossvg) {
  d3.select(".grafico").node().append(datossvg.documentElement);
});




//Condiciones Iniciales Mapa
d3.svg("svg/MEX.svg").then(function (datossvg) {
  d3.select(".graficoMAPA").node().append(datossvg.documentElement);
  d3.select(".graficoMAPA rect").style("stroke","none");
  d3.selectAll("#infoHoverMapa text").style("fill","none");
});





//Condiciones Iniciales Regiones
d3.svg("svg/Regiones.svg").then(function (datossvg) {
  d3.select(".grafRegiones").node().append(datossvg.documentElement);


  //Asignar colores y stroke a flechas
  d3.selectAll("#flechasRegiones path").attr("data-color", function() {
    return d3.select(this).style("fill");
  }).attr("data-stroke", function() {
    return d3.select(this).style("stroke");
  }).style("fill","none").style("stroke","none")
  .style("opacity","0");

  //Asignar colores y stroke a dots
  d3.selectAll("#dotsRegiones path").attr("data-color", function() {
    return d3.select(this).style("fill");
  }).attr("data-stroke", function() {
    return d3.select(this).style("stroke");
  }).style("fill","none").style("stroke","none")
  .style("opacity","0");

  //Asignar colores y stroke a violines
  d3.selectAll("#violinesRegiones path")
  .attr("data-fill", function() {
    return d3.select(this).style("fill");
  }).attr("data-stroke", function() {
    return d3.select(this).style("stroke");
  }).style("fill","none")
   .style("opacity","0");
});

//Condiciones Iniciales S
d3.svg("svg/SVG_GASTOP.svg").then(function (datossvg2) {
  d3.select(".graficoMexS").node().append(datossvg2.documentElement);
  
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
d3.selectAll("#Capa_1 text").style("font-family","Montserrat, sans-serif");

d3.select("#botonHighlights").style("visibility","hidden")

});

//Condiciones Iniciales Hallazgos
d3.select(".Hallazgos")
.append("img")
.attr("src", "svg/Hallazgos.png")
.style("object-fit", "contain")
.style("column-span", "all");

