
let endpoint_arteCarrusel = "datos/JSON_arteCarrusel.json";

d3.json(endpoint_arteCarrusel).then((datosjson) => {
  let OrdenCarrusel = [];
  let ObraCarrusel = [];
  let PintorCarrusel = [];
  let i = 0;

  datosjson.data.forEach(function (data) {
    OrdenCarrusel.push(data.Orden);
    ObraCarrusel.push(data.Obra);
    PintorCarrusel.push(data.Pintor);
  });

  //console.log("PINTOR= " + PintorCarrusel);

  for (let j = 1; j < OrdenCarrusel.length + 1; j++) {
    for (let z = 1; z < 3; z++) {
      let idtemp = "Carr" + j + "x" + z;
      d3.select("#" + idtemp).attr("data-OrdenCarrusel", OrdenCarrusel[i]);
      let texto = d3.select("#" + idtemp).attr("data-OrdenCarrusel");
      d3.select("#" + idtemp).text(texto);
      z++;
      idtemp = "Carr" + j + "x" + z;
      d3.select("#" + idtemp).attr("data-ObraCarrusel", ObraCarrusel[i]);
      texto = d3.select("#" + idtemp).attr("data-ObraCarrusel");
      d3.select("#" + idtemp).text(texto);
      z++;
      idtemp = "Carr" + j + "x" + z;
      d3.select("#" + idtemp).attr("data-PintorCarrusel", PintorCarrusel[i]);
      texto = d3.select("#" + idtemp).attr("data-PintorCarrusel");
      d3.select("#" + idtemp).text(texto);
      i++;
    }
  }
});

//d3.select("#Carr1x1").attr("data-prueba", PintorCarrusel[1]);
