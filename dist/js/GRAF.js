let endpoint_arteGraf = "datos/JSON_arteGraf.json";

var width = 300,
  height = 300;

let svg = d3
  .select(".imagDispGrafico")
  .append("svg")
  .attr("width", width)
  .attr("height", height);

svg.append("image").attr("xlink:href", "");

d3.json(endpoint_arteGraf).then((datosjson) => {
  let OrdenGraf = [];
  let ObraGraf = [];
  let PintorGraf = [];
  let CreadoGraf = [];
  let CostoMDDGraf = [];
  let MedidasGraf = [];
  let F_VentaGraf = [];
  let NotasGraf = [];

  let i = 0;

  datosjson.data.forEach(function (data) {
    OrdenGraf.push(data.Orden);
    ObraGraf.push(data.Obra);
    PintorGraf.push(data.Pintor);
    CreadoGraf.push(data.Creado);
    CostoMDDGraf.push(data.CostoMDD);
    MedidasGraf.push(data.Medidas);
    F_VentaGraf.push(data.F_Venta);
    NotasGraf.push(data.Notas);
  });

  //console.log("PINTOR= " + PintorCarrusel);

  d3.selectAll(".grafico svg").on("mouseenter", function () {
    //d3.select(this).style("fill", "#FFFFFF");
    //d3.select(this).transition.duration(350).style("fill", "#FFFFFF");
    console.log("ENTRA HOVER");
  });

  d3.select(".grafico").on("mouseenter", function () {
    //d3.select(this).style("fill", "#FFFFFF");
    //d3.select(this).transition.duration(350).style("fill", "#FFFFFF");
    //console.log("ENTRA HOVER 1");
    for (let j = 1; j < OrdenGraf.length + 1; j++) {
      let idtemp = "C" + j;
      d3.select("#" + idtemp).attr("data-OrdenGraf", OrdenGraf[j - 1]);
      d3.select("#" + idtemp).attr("data-ObraGraf", ObraGraf[j - 1]);
      d3.select("#" + idtemp).attr("data-PintorGraf", PintorGraf[j - 1]);
      d3.select("#" + idtemp).attr("data-CreadoGraf", CreadoGraf[j - 1]);
      d3.select("#" + idtemp).attr("data-CostoMDDGraf", CostoMDDGraf[j - 1]);
      d3.select("#" + idtemp).attr("data-MedidasGraf", MedidasGraf[j - 1]);
      d3.select("#" + idtemp).attr("data-F_VentaGraf", F_VentaGraf[j - 1]);
      d3.select("#" + idtemp).attr("data-NotasGraf", NotasGraf[j - 1]);

      d3.select("#" + idtemp).on("mouseenter", function () {
        let imtemp = "assets/images/" + j + ".png";
        d3.select("#TC1").text("Ranking: " + OrdenGraf[j - 1]);
        d3.select("#TC2").text(ObraGraf[j - 1] + ", Año: " + CreadoGraf[j - 1]);
        d3.select("#TC3").text(PintorGraf[j - 1]);
        d3.select("#TC4").text(NotasGraf[j - 1]);
        d3.select("#TC5").text("Precio en MDD: " + CostoMDDGraf[j - 1]);
        d3.select("#TC6").text("Medidas de la obra: " + MedidasGraf[j - 1]);
        d3.select("#TC7").text("Fecha de Venta: " + F_VentaGraf[j - 1]);
        //d3.select(this).attr("transform", "translate(0,-150)");

        svg
          .append("image")
          .attr("xlink:href", imtemp);
      });

      d3.select("#" + idtemp).on("mouseleave", function () {
        //d3.select(this).attr("transform", "translate(0,0)");
      });

      //console.log("Entra aaaaaafor");
    }
  });

  //Asignar Circulos
});
