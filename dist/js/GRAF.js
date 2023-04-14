let endpoint_arteGraf = "datos/JSON_SexeniosPIB.json";

d3.json(endpoint_arteGraf).then((datosjson) => {
  let OrdenSPIB = [];
  let S1 = [];
  let S2 = [];
  let S3 = [];
  let S4 = [];
  let S1vsS2 = [];
  let Entidad = [];

  let i = 0;

  datosjson.data.forEach(function (data) {
    OrdenSPIB.push(data.Index);
    S1.push(data.S1);
    S2.push(data.S2);
    S3.push(data.S3);
    S4.push(data.S4);
    S1vsS2.push(data.S1vsS2);
    Entidad.push(data.Entidad);
  });

  //console.log("PINTOR= " + PintorCarrusel);

  d3.select(".grafico svg").on("mouseenter", function () {
    //d3.select(this).style("fill", "#FFFFFF");
    //d3.select(this).transition.duration(350).style("fill", "#FFFFFF");
    //console.log("ENTRA HOVER 1");
      d3.select("#Fondo").attr("data-OrdenGraf", OrdenSPIB);

      d3.select("#Fondo").on("mouseenter", function () {
        d3.select("#TC1").text("Ranking: " + OrdenSPIB[0]);
        d3.select("#TC2").text(OrdenSPIB[2]);
        d3.select("#TC3").text(OrdenSPIB[3]);
        d3.select("#TC4").text(OrdenSPIB[5]);
        //d3.select(this).attr("transform", "translate(0,-150)");

      });
  });

  d3.selectAll(".grafico text").on("mouseenter", function () {
    d3.select(this).style("fill", "#FFFFFF");
    //d3.select(this).transition.duration(350).style("fill", "#FFFFFF");
    console.log("ENTRA HOVER");
  });
  
  d3.selectAll(".grafico g").on("mouseenter", function () {
    d3.select(this).style("fill", "#FFFFFF");
    //d3.select(this).transition.duration(350).style("fill", "#FFFFFF");
    console.log("ENTRA HOVER");
  });
  
  //Asignar Circulos
});
