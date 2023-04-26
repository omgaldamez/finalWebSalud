let endpointMapa = "datos/JSON_ALF.json";

d3.select(".MAPAdropbtn").on("click", function () {
    d3.selectAll("#mapasEstado path").style("stroke","#000000")
  d3.json(endpointMapa).then((datosjson) => {
    let mapa_Estado = [];
    let mapa_ANIO = [];
    let mapa_Posicion = [];
    let mapa_PERC = [];
    let mapa_PIB = [];
    let mapa_GPT = [];

    //push a Arrays
    datosjson.data.forEach(function (data) {
      mapa_Estado.push(data.Estado);
      mapa_ANIO.push(data.Anio);
      mapa_Posicion.push(data.Orden);
      mapa_PERC.push(data.PERCAPITA.toFixed(2));
      mapa_PIB.push(data.PIB.toFixed(2));
      mapa_GPT.push(data.GPT.toFixed(2));
    });

    let mapa_Estado_long = [...new Set(mapa_Estado)];
    let z = 0;
    //asignar data-OrdenEstado y modificar texto Entidades SVG
    for (let j = 1; j < mapa_Estado_long.length + 1; j++) {
      let idtemp = "ALF" + j+"M";
      if (mapa_Estado_long[j - 1] === "EDOMEX") {
        mapa_Estado_long[j - 1] = "MEX";
      }
      d3.select("#" + idtemp)
        .attr("data-mapaESTADO", mapa_Estado.slice(z, z + 23))
        .attr("data-mapaANIO", mapa_ANIO.slice(z, z + 23))
        .attr("data-mapaPERC", mapa_PERC.slice(z, z + 23))
        .attr("data-mapaPIB", mapa_PIB.slice(z, z + 23))
        .attr("data-mapaGPT", mapa_GPT.slice(z, z + 23));
      z = z + 23;
      //console.log("z:", z);
    }

    let i = 0;
    let items = document.querySelectorAll(".MAPAdropdown-content a");
    items.forEach((item) => {
      item.addEventListener("click", (e) => {
        e.preventDefault();
        showValues(item);
        let selEstado = item.innerText;
        console.log(selEstado);
        selEstado = selEstado - 1995;
        console.log("SEL ESTADO", selEstado);

        for (let j = 1; j < 33; j++) {
          let idtemp = "ALF" + j+"M";
          let mapPERC = d3.select("#" + idtemp).attr("data-mapaPERC");
          const myArrayPERC = mapPERC.split(",");

          d3.select("#" + idtemp).attr("data-mapaPERC", myArrayPERC);
          if (myArrayPERC[selEstado] <= 1000) {
            d3.select("#" + idtemp)
              .transition()
              .duration(1500)
              .style("fill", "#FFEDDC");
          }
          if (myArrayPERC[selEstado] > 1000 && myArrayPERC[selEstado] <= 2000) {
            d3.select("#" + idtemp)
              .transition()
              .duration(1500)
              .style("fill", "#FDE0C1");
          }
          if (myArrayPERC[selEstado] > 2000 && myArrayPERC[selEstado] <= 3000) {
            d3.select("#" + idtemp)
              .transition()
              .duration(1500)
              .style("fill", "#FDC999");
          }
          if (myArrayPERC[selEstado] > 3000 && myArrayPERC[selEstado] <= 4000) {
            d3.select("#" + idtemp)
              .transition()
              .duration(1500)
              .style("fill", "#FDA25C");
          }
          if (myArrayPERC[selEstado] > 4000 && myArrayPERC[selEstado] <= 5000) {
            d3.select("#" + idtemp)
              .transition()
              .duration(1500)
              .style("fill", "#F99756");
          }
          if (myArrayPERC[selEstado] > 5000 && myArrayPERC[selEstado] <= 8000) {
            d3.select("#" + idtemp)
              .transition()
              .duration(1500)
              .style("fill", "#E56017");
          }
          if (
            myArrayPERC[selEstado] > 8000 &&
            myArrayPERC[selEstado] <= 13000
          ) {
            d3.select("#" + idtemp)
              .transition()
              .duration(1500)
              .style("fill", "#C2480D");
          }
          if (
            myArrayPERC[selEstado] > 13000 &&
            myArrayPERC[selEstado] <= 14000
          ) {
            d3.select("#" + idtemp)
              .transition()
              .duration(1500)
              .style("fill", "#953307");
          }
          //console.log("DIVISION: ", myArrayPERC);
          //console.log("SI ENTRO IF ARRAY");
        }
      });
    });

    d3.selectAll("#mapasEstado path").on("mouseenter", function () {
      //d3.select(this).style("fill", "#FFFFFF");
      //d3.select(this).transition.duration(350).style("fill", "#FFFFFF");
      let mapEstado = d3.select(this).attr("data-mapaESTADO");
      const myArrayEstado = mapEstado.split(",");
      d3.select("#estadoMapa").text(myArrayEstado[0]);
      let mapLeyPERC = d3.select(this).attr("data-mapaPERC");
      d3.select("#leyendaPERCMapa").text(mapLeyPERC);
    });
  });
});

d3.select(".dropbtnMapaPIB").on("click", function () {
  d3.json(endpointMapa).then((datosjson) => {
    let mapa_Estado = [];
    let mapa_ANIO = [];
    let mapa_Posicion = [];
    let mapa_PERC = [];
    let mapa_PIB = [];
    let mapa_GPT = [];

    //push a Arrays
    datosjson.data.forEach(function (data) {
      mapa_Estado.push(data.Estado);
      mapa_ANIO.push(data.Anio);
      mapa_Posicion.push(data.Orden);
      mapa_PERC.push(data.PERCAPITA.toFixed(2));
      mapa_PIB.push(data.PIB.toFixed(2));
      mapa_GPT.push(data.GPT.toFixed(2));
    });

    let mapa_Estado_long = [...new Set(mapa_Estado)];
    let z = 0;
    //asignar data-OrdenEstado y modificar texto Entidades SVG
    for (let j = 1; j < mapa_Estado_long.length + 1; j++) {
      let idtemp = "ALF" + j;
      if (mapa_Estado_long[j - 1] === "EDOMEX") {
        mapa_Estado_long[j - 1] = "MEX";
      }
      d3.select("#" + idtemp)
        .attr("data-mapaESTADO", mapa_Estado.slice(z, z + 23))
        .attr("data-mapaANIO", mapa_ANIO.slice(z, z + 23))
        .attr("data-mapaPERC", mapa_PERC.slice(z, z + 23))
        .attr("data-mapaPIB", mapa_PIB.slice(z, z + 23))
        .attr("data-mapaGPT", mapa_GPT.slice(z, z + 23));
      z = z + 23;
      //console.log("z:", z);
    }

    let i = 0;
    let items = document.querySelectorAll(".dropdown-contentMapaPIB a");
    items.forEach((item) => {
      item.addEventListener("click", (e) => {
        e.preventDefault();
        showValues(item);
        let selEstado = item.innerText;
        console.log(selEstado);
        selEstado = selEstado - 1995;
        console.log("SEL ESTADO", selEstado);

        for (let j = 1; j < 33; j++) {
          let idtemp = "ALF" + j;
          let mapPIB = d3.select("#" + idtemp).attr("data-mapaPIB");
          const myArrayPIB = mapPIB.split(",");
          //console.log("SPLIT PERC: ", myArrayPERC);
          //console.log("idtemp A: ", idtemp);

          d3.select("#" + idtemp).attr("data-mapaPERC", myArrayPIB);
          if (myArrayPIB[selEstado] <= 0.5) {
            d3.select("#" + idtemp)
              .transition()
              .duration(1500)
              .style("fill", "#FFF0E1");
          }
          if (myArrayPIB[selEstado] > 0.5 && myArrayPIB[selEstado] <= 1) {
            d3.select("#" + idtemp)
              .transition()
              .duration(1500)
              .style("fill", "#FEE9D5");
          }
          if (myArrayPIB[selEstado] > 1 && myArrayPIB[selEstado] <= 1.5) {
            d3.select("#" + idtemp)
              .transition()
              .duration(1500)
              .style("fill", "#FCD8B3");
          }
          if (myArrayPIB[selEstado] > 1.5 && myArrayPIB[selEstado] <= 2) {
            d3.select("#" + idtemp)
              .transition()
              .duration(1500)
              .style("fill", "#FDCA9A");
          }
          if (myArrayPIB[selEstado] > 2 && myArrayPIB[selEstado] <= 2.5) {
            d3.select("#" + idtemp)
              .transition()
              .duration(1500)
              .style("fill", "#FDB376");
          }
          if (myArrayPIB[selEstado] > 2.5 && myArrayPIB[selEstado] <= 3) {
            d3.select("#" + idtemp)
              .transition()
              .duration(1500)
              .style("fill", "#FCA460");
          }
          if (myArrayPIB[selEstado] > 3 && myArrayPIB[selEstado] <= 3.5) {
            d3.select("#" + idtemp)
              .transition()
              .duration(1500)
              .style("fill", "#F88231");
          }
          if (myArrayPIB[selEstado] > 3.5 && myArrayPIB[selEstado] <= 4) {
            d3.select("#" + idtemp)
              .transition()
              .duration(1500)
              .style("fill", "#F07222");
          }
          if (myArrayPIB[selEstado] > 4 && myArrayPIB[selEstado] <= 4.5) {
            d3.select("#" + idtemp)
              .transition()
              .duration(1500)
              .style("fill", "#E15C14");
          }
          if (myArrayPIB[selEstado] > 4.5 && myArrayPIB[selEstado] <= 5) {
            d3.select("#" + idtemp)
              .transition()
              .duration(1500)
              .style("fill", "#CE5F29");
          }
          if (myArrayPIB[selEstado] > 5 && myArrayPIB[selEstado] <= 5.5) {
            d3.select("#" + idtemp)
              .transition()
              .duration(1500)
              .style("fill", "#AC4110");
          }
          if (myArrayPIB[selEstado] > 5.5 && myArrayPIB[selEstado] <= 6) {
            d3.select("#" + idtemp)
              .transition()
              .duration(1500)
              .style("fill", "#8F310A");
          }
          //console.log("DIVISION: ", myArrayPERC);
          //console.log("SI ENTRO IF ARRAY");
        }
      });
    });

    d3.selectAll("#mapasEstado path").on("mouseenter", function () {
      //d3.select(this).style("fill", "#FFFFFF");
      //d3.select(this).transition.duration(350).style("fill", "#FFFFFF");
      let mapEstado = d3.select(this).attr("data-mapaESTADO");
      const myArrayEstado = mapEstado.split(",");
      d3.select("#estadoMapa").text(myArrayEstado[0]);
    });
  });
});

d3.select(".dropbtnMapaGPT").on("click", function () {
  d3.json(endpointMapa).then((datosjson) => {
    let mapa_Estado = [];
    let mapa_ANIO = [];
    let mapa_Posicion = [];
    let mapa_PERC = [];
    let mapa_PIB = [];
    let mapa_GPT = [];

    //push a Arrays
    datosjson.data.forEach(function (data) {
      mapa_Estado.push(data.Estado);
      mapa_ANIO.push(data.Anio);
      mapa_Posicion.push(data.Orden);
      mapa_PERC.push(data.PERCAPITA.toFixed(2));
      mapa_PIB.push(data.PIB.toFixed(2));
      mapa_GPT.push(data.GPT.toFixed(2));
    });

    let mapa_Estado_long = [...new Set(mapa_Estado)];
    let z = 0;
    //asignar data-OrdenEstado y modificar texto Entidades SVG
    for (let j = 1; j < mapa_Estado_long.length + 1; j++) {
      let idtemp = "ALF" + j;
      if (mapa_Estado_long[j - 1] === "EDOMEX") {
        mapa_Estado_long[j - 1] = "MEX";
      }
      d3.select("#" + idtemp)
        .attr("data-mapaESTADO", mapa_Estado.slice(z, z + 23))
        .attr("data-mapaANIO", mapa_ANIO.slice(z, z + 23))
        .attr("data-mapaPERC", mapa_PERC.slice(z, z + 23))
        .attr("data-mapaPIB", mapa_PIB.slice(z, z + 23))
        .attr("data-mapaGPT", mapa_GPT.slice(z, z + 23));
      z = z + 23;
      //console.log("z:", z);
    }

    let i = 0;
    let items = document.querySelectorAll(".dropdown-contentMapaGPT a");
    items.forEach((item) => {
      item.addEventListener("click", (e) => {
        e.preventDefault();
        showValues(item);
        let selEstado = item.innerText;
        console.log(selEstado);
        selEstado = selEstado - 1995;
        console.log("SEL ESTADO", selEstado);

        for (let j = 1; j < 33; j++) {
          let idtemp = "ALF" + j;
          let mapGPT = d3.select("#" + idtemp).attr("data-mapaGPT");
          const myArrayGPT = mapGPT.split(",");
          //console.log("SPLIT PERC: ", myArrayPERC);
          //console.log("idtemp A: ", idtemp);

          d3.select("#" + idtemp).attr("data-mapaGPT", myArrayGPT);
          if (myArrayGPT[selEstado] <= 5) {
            d3.select("#" + idtemp)
              .transition()
              .duration(1500)
              .style("fill", "#FDECDB");
          }
          if (myArrayGPT[selEstado] > 5 && myArrayGPT[selEstado] <= 10) {
            d3.select("#" + idtemp)
              .transition()
              .duration(1500)
              .style("fill", "#FCDBBA");
          }
          if (myArrayGPT[selEstado] > 10 && myArrayGPT[selEstado] <= 15) {
            d3.select("#" + idtemp)
              .transition()
              .duration(1500)
              .style("fill", "#FCBD88");
          }
          if (myArrayGPT[selEstado] > 15 && myArrayGPT[selEstado] <= 20) {
            d3.select("#" + idtemp)
              .transition()
              .duration(1500)
              .style("fill", "#FA974F");
          }
          if (myArrayGPT[selEstado] > 20 && myArrayGPT[selEstado] <= 25) {
            d3.select("#" + idtemp)
              .transition()
              .duration(1500)
              .style("fill", "#ED6E21");
          }
          if (myArrayGPT[selEstado] > 25 && myArrayGPT[selEstado] <= 30) {
            d3.select("#" + idtemp)
              .transition()
              .duration(1500)
              .style("fill", "#CE5419");
          }
          if (myArrayGPT[selEstado] > 30 && myArrayGPT[selEstado] <= 45) {
            d3.select("#" + idtemp)
              .transition()
              .duration(1500)
              .style("fill", "#9D3E13");
          }
          //console.log("DIVISION: ", myArrayPERC);
          //console.log("SI ENTRO IF ARRAY");
        }
      });
    });

    d3.selectAll("#mapasEstado path").on("mouseenter", function () {
      //d3.select(this).style("fill", "#FFFFFF");
      //d3.select(this).transition.duration(350).style("fill", "#FFFFFF");
      let mapEstado = d3.select(this).attr("data-mapaESTADO");
      const myArrayEstado = mapEstado.split(",");
      d3.select("#estadoMapa").text(myArrayEstado[0]);
    });
  });
});

const showValues = (item) => {};
