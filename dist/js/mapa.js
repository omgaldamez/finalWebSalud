let endpointMapa = "datos/JSON_ALF.json";

d3.selectAll(".MAPAdropbtn").on("click", function () {
  console.log("BOTON MAPA")
  let tempDropMAPA = d3.select(this).attr("id");
    d3.selectAll("#mapasEstado path").style("stroke","#000000");
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

    if(tempDropMAPA === "MAPAdropbtnPERC"){
      var DATAMAPA = "data-mapaPERC"
    }
    if(tempDropMAPA === "MAPAdropbtnPIB"){
      var DATAMAPA = "data-mapaPIB"
    }
    if(tempDropMAPA === "MAPAdropbtnGPT"){
      var DATAMAPA = "data-mapaGPT"
    }


    let i = 0;
    d3.selectAll(".MAPAdropdown-content a").on("click", function() {
      var selAnioCLICK = d3.select(this).text();
        console.log(selAnioCLICK);
        selAnio = selAnioCLICK - 1995;
        console.log("SEL ANIO", selAnio);

  d3.select("#ANIOMAPA").text(selAnioCLICK).style("fill","#FFFFFF");

        let MAPAarray = [];


        for (let j = 1; j < 33; j++) {
          let idtemp = "ALF" + j+"M";
          let mapPERC = d3.select("#" + idtemp).attr(DATAMAPA);
          const myArrayPERC = mapPERC.split(",");
          var MAPAvalMax = Math.max(...myArrayPERC);
          MAPAarray.push(MAPAvalMax);
        }

        for (let j = 1; j < 33; j++) {
          let idtemp = "ALF" + j+"M";
          let mapPERC = d3.select("#" + idtemp).attr(DATAMAPA);
          const myArrayPERC = mapPERC.split(",");

//console.log("MAPA ARRAY FOR 2: ",MAPAarray[selAnio]*0.1);

          if (myArrayPERC[selAnio] <= MAPAarray[selAnio]*0.1){
            console.log("SI ENTRA FOR 2")
            d3.select("#" + idtemp)
              .transition()
              .duration(1500)
              .style("fill", "#FFF1E4");
          }
          if (myArrayPERC[selAnio] > MAPAarray[selAnio]*0.1 && myArrayPERC[selAnio] <= MAPAarray[selAnio]*0.2) {
            d3.select("#" + idtemp)
              .transition()
              .duration(1500)
              .style("fill", "#FEE1C5");
          }
          if (myArrayPERC[selAnio] > MAPAarray[selAnio]*0.2 && myArrayPERC[selAnio] <= MAPAarray[selAnio]*0.3) {
            d3.select("#" + idtemp)
              .transition()
              .duration(1500)
              .style("fill", "#FDD0A4");
          }
          if (myArrayPERC[selAnio] > MAPAarray[selAnio]*0.3 && myArrayPERC[selAnio] <= MAPAarray[selAnio]*0.4) {
            d3.select("#" + idtemp)
              .transition()
              .duration(1500)
              .style("fill", "#FDB87D");
          }
          if (myArrayPERC[selAnio] > MAPAarray[selAnio]*0.4 && myArrayPERC[selAnio] <= MAPAarray[selAnio]*0.5) {
            d3.select("#" + idtemp)
              .transition()
              .duration(1500)
              .style("fill", "#FD9E56");
          }
          if (myArrayPERC[selAnio] > MAPAarray[selAnio]*0.5 && myArrayPERC[selAnio] <= MAPAarray[selAnio]*0.6) {
            d3.select("#" + idtemp)
              .transition()
              .duration(1500)
              .style("fill", "#F88435");
          }
          if (myArrayPERC[selAnio] > MAPAarray[selAnio]*0.6 && myArrayPERC[selAnio] <= MAPAarray[selAnio]*0.7) {
            d3.select("#" + idtemp)
              .transition()
              .duration(1500)
              .style("fill", "#EC6A1B");
          }
          if (myArrayPERC[selAnio] > MAPAarray[selAnio]*0.7 && myArrayPERC[selAnio] <= MAPAarray[selAnio]*0.8) {
            d3.select("#" + idtemp)
              .transition()
              .duration(1500)
              .style("fill", "#D7530F");
          }
          if (myArrayPERC[selAnio] > MAPAarray[selAnio]*0.8 && myArrayPERC[selAnio] <= MAPAarray[selAnio]*0.9) {
            d3.select("#" + idtemp)
              .transition()
              .duration(1500)
              .style("fill", "#B4420E");
          }
          if (myArrayPERC[selAnio] > MAPAarray[selAnio]*0.9) {
            d3.select("#" + idtemp)
              .transition()
              .duration(1500)
              .style("fill", "#94360F");
          }
          //console.log("DIVISION: ", myArrayPERC);
          //console.log("SI ENTRO IF ARRAY");
        }


      });
      


    
  });

  
  
  d3.selectAll("#mapasEstado path").on("mouseenter", function () {
    d3.selectAll("#leyendaFijo text").style("fill", "#FFFFFF");
    var DATAHOVER = d3.select(this).attr("data-mapaESTADO");
    var myArrayDATAHOVER = DATAHOVER.split(",");
    d3.select("#hoverEstadoMapa").text(myArrayDATAHOVER[0]).style("fill","#FFFFFF");
    
});


d3.selectAll("#mapasEstado path").on("click", function () {

  let numeroALFid = d3.select("#mapasEstado path").attr("id").match(/\d+/g).map(Number);
  DATAHOVER = d3.select(this).attr("data-mapaPERC");
  myArrayDATAHOVER = DATAHOVER.split(",");
  d3.select("#hoverEstadoPERC").text(myArrayDATAHOVER[numeroALFid-1]).style("fill","#FFFFFF");
  
  DATAHOVER = d3.select(this).attr("data-mapaPIB");
  myArrayDATAHOVER = DATAHOVER.split(",");
  d3.select("#hoverEstadoPIB").text(myArrayDATAHOVER[numeroALFid-1]).style("fill","#FFFFFF");
  
  DATAHOVER = d3.select(this).attr("data-mapaGPT");
  myArrayDATAHOVER = DATAHOVER.split(",");
  d3.select("#hoverEstadoGPT").text(myArrayDATAHOVER[numeroALFid-1]).style("fill","#FFFFFF");
});

});

