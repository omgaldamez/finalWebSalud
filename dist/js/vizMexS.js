let endpointPERC = "datos/JSON_PERC.json";
let endpointmeanPERC = "datos/JSON_meanPERC.json";
//Se activa con boton Orden PERCAPITA
d3.select(".dropbtn").on("click", function () {
  d3.json(endpointPERC).then((datosjson) => {
    let OrdenPERC_Estado = [];
    let OrdenPERC_ANIO = [];
    let OrdenPERC_Posicion = [];
    let OrdenPERC_PERC = [];
    let OrdenPERC_PIB = [];
    let OrdenPERC_PIBmean = [];
    let OrdenPERC_GPT = [];
    let OrdenPERC_EstadoPrint = [];
    let i = 0;

    //push a Arrays
    datosjson.data.forEach(function (data) {
      OrdenPERC_Estado.push(data.Estado);
      OrdenPERC_ANIO.push(data.Anio);
      OrdenPERC_Posicion.push(data.OrdenPERC);
      OrdenPERC_PERC.push(data.PERCAPITA.toFixed(0));
      OrdenPERC_PIB.push(data.PIB.toFixed(2));
      OrdenPERC_PIBmean.push(data.PIBmean);
      OrdenPERC_GPT.push(data.GPT.toFixed(2));
      OrdenPERC_EstadoPrint.push(data.EstadoPrint);
    });

    
        
    console.log("ORDEN PRINT: ", OrdenPERC_Estado);

        //Reverse y Splice
    let OrdenPERC_Estado_long = [...new Set(OrdenPERC_Estado)];
        let parts = 32;

        // Calculate the size of each part
        let partSize = Math.ceil(OrdenPERC_PERC.length / parts);
        // Use a for loop to reverse each part of the array
        for (i = 0; i < OrdenPERC_PERC.length; i += partSize) {
          let partPERC = OrdenPERC_PERC.slice(i, i + partSize).reverse();
          let partPIB = OrdenPERC_PIB.slice(i, i + partSize).reverse();
          let partGPT = OrdenPERC_GPT.slice(i, i + partSize).reverse();
          let partEstado = OrdenPERC_Estado.slice(i, i + partSize).reverse();
          let partAnio = OrdenPERC_ANIO.slice(i, i + partSize).reverse();
          let partPosicion = OrdenPERC_Posicion.slice(i, i + partSize).reverse();
          let partEstado_Print = OrdenPERC_EstadoPrint.slice(i, i + partSize).reverse();

          OrdenPERC_PERC.splice(i, partSize, ...partPERC);
          OrdenPERC_PIB.splice(i, partSize, ...partPIB);
          OrdenPERC_EstadoPrint.splice(i, partSize, ...partEstado_Print);
          OrdenPERC_GPT.splice(i, partSize, ...partGPT);
          OrdenPERC_Estado.splice(i, partSize, ...partEstado);
          OrdenPERC_ANIO.splice(i, partSize, ...partAnio);
          OrdenPERC_Posicion.splice(i, partSize, ...partPosicion);
        }

        
console.log("ENT: ", OrdenPERC_Estado_long);
    d3.selectAll("#AZUL path").style("fill", "none");
    //asignar data-OrdenEstado y modificar texto Entidades SVG
    for (let j = 1; j < OrdenPERC_Estado_long.length + 1; j++) {
      let idtemp = "ENT" + j;
      if (OrdenPERC_Estado_long[j - 1] === "EDOMEX") {
        OrdenPERC_Estado_long[j - 1] = "MEX";
      }
      d3.select("#" + idtemp).attr(
        "data-OrdenEstado",
        OrdenPERC_Estado_long[j - 1]
      );

      d3.select("#" + idtemp)
        .select("tspan")
        .text(OrdenPERC_Estado_long[j - 1]);

    }

    //Prender textos
    d3.selectAll("#ENTIDAD tspan").style("fill", "#FFFFFF");
    d3.selectAll("#ANIO tspan").style("fill", "#FFFFFF");
    d3.selectAll("#ANIO text").style("fill", "#FFFFFF");
    d3.selectAll("#ANIO path").style("stroke", "#FFFFFF");
    d3.selectAll("#ENTIDAD text").style("fill", "#FFFFFF");
    d3.selectAll("#NUM text").style("fill", "#FFFFFF");

    

    //Asignar valores data- a HEATS SVG
 

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
        
        let recorrido=0;
        for(let fillE =1; fillE<=32; fillE++){
        var pathSelector = "#E" + fillE + " path[data-y]";
        const pathFilter1 = d3.selectAll(pathSelector).filter((d,i) => i <23);
        
        var dataYArray = [];
        
        pathFilter1.each(function(d, i) {
          var dataYValue = d3.select(this).attr("data-y");
          dataYArray.push(parseFloat(dataYValue));
          dataYArray = dataYArray.sort().reverse();

          d3.select(this).attr("data-PERC", function(d,i){
            var dataNuevos = OrdenPERC_PERC[recorrido];
            return dataNuevos;
          }).attr("data-PIB", function(d,i){
            dataNuevos = OrdenPERC_PIB[recorrido];
            return dataNuevos;
        }).attr("data-GPT", function(d,i){
            dataNuevos = OrdenPERC_GPT[recorrido];
            return dataNuevos;
        }).attr("data-ESTADO", function(d,i){
            dataNuevos = OrdenPERC_Estado[recorrido];
            return dataNuevos;
        }).attr("data-ANIO", function(d,i){
            dataNuevos = OrdenPERC_ANIO[recorrido];
            return dataNuevos;
        }).attr("data-POSICION", function(d,i){
            dataNuevos = OrdenPERC_Posicion[recorrido];
            return dataNuevos;
        }).attr("data-ESTADOPRINT", function(d,i){
          dataNuevos = OrdenPERC_EstadoPrint[recorrido];
          return dataNuevos;
      });


let valMaxPERC = Math.max(...OrdenPERC_PERC);
          //Asignar colores HEATMAP
          let indicadorSel=d3.select(this).attr("data-PERC");
        if (indicadorSel <= valMaxPERC*0.1) {
            d3.select(this)
              .transition()
              .duration(1500)
              .style("fill", "#FFF1E4")
              .attr("Recorrido", recorrido);
              d3.select("#rangoDiez").text(Math.floor(valMaxPERC*0.1));
              d3.select(this).attr("data-Leyenda", "H10");
          }
          if (indicadorSel > valMaxPERC*0.1 && indicadorSel <= valMaxPERC*0.2) {
            d3.select(this)
              .transition()
              .duration(1500)
              .style("fill", "#FEE1C5")
              .attr("Recorrido", recorrido);
              d3.select("#rangoVeinte").text(Math.floor(valMaxPERC*0.2));
              d3.select(this).attr("data-Leyenda", "H20");
          }
          if (indicadorSel > valMaxPERC*0.2 && indicadorSel <= valMaxPERC*0.3) {
            d3.select(this)
              .transition()
              .duration(1500)
              .style("fill", "#FDD0A4")
              .attr("Recorrido", recorrido);
              d3.select("#rangoTreinta").text(Math.floor(valMaxPERC*0.3));
              d3.select(this).attr("data-Leyenda", "H30");
          }
          if (indicadorSel > valMaxPERC*0.3 && indicadorSel <= valMaxPERC*0.4) {
            d3.select(this)
              .transition()
              .duration(1500)
              .style("fill", "#FDB87D")
              .attr("Recorrido", recorrido);
              d3.select("#rangoCuarenta").text(Math.floor(valMaxPERC*0.4));
              d3.select(this).attr("data-Leyenda", "H40");
          }
          if (indicadorSel > valMaxPERC*0.4 && indicadorSel <= valMaxPERC*0.5) {
            d3.select(this)
              .transition()
              .duration(1500)
              .style("fill", "#FD9E56")
              .attr("Recorrido", recorrido);
              d3.select("#rangoCincuenta").text(Math.floor(valMaxPERC*0.5));
              d3.select(this).attr("data-Leyenda", "H50");
          }
          if (indicadorSel > valMaxPERC*0.5 && indicadorSel <= valMaxPERC*0.6) {
            d3.select(this)
              .transition()
              .duration(1500)
              .style("fill", "#F88435")
              .attr("Recorrido", recorrido);
              d3.select("#rangoSesenta").text(Math.floor(valMaxPERC*0.6));
              d3.select(this).attr("data-Leyenda", "H60");
          }
          if (indicadorSel > valMaxPERC*0.6 && indicadorSel <= valMaxPERC*0.7) {
            d3.select(this)
              .transition()
              .duration(1500)
              .style("fill", "#EC6A1B")
              .attr("Recorrido", recorrido);
              d3.select("#rangoSetenta").text(Math.floor(valMaxPERC*0.7));
              d3.select(this).attr("data-Leyenda", "H70");
          }
          if (indicadorSel > valMaxPERC*0.7 && indicadorSel <= valMaxPERC*0.8) {
            d3.select(this)
              .transition()
              .duration(1500)
              .style("fill", "#D7530F")
              .attr("Recorrido", recorrido);
              d3.select("#rangoOchenta").text(Math.floor(valMaxPERC*0.8));
              d3.select(this).attr("data-Leyenda", "H80");
          }
          if (indicadorSel > valMaxPERC*0.8 && indicadorSel <= valMaxPERC*0.9) {
            d3.select(this)
              .transition()
              .duration(1500)
              .style("fill", "#B4420E")
              .attr("Recorrido", recorrido);
              d3.select("#rangoNoventa").text(Math.floor(valMaxPERC*0.9));
              d3.select(this).attr("data-Leyenda", "H90");
          }
          if (indicadorSel > valMaxPERC*0.9) {
            d3.select(this)
              .transition()
              .duration(1500)
              .style("fill", "#94360F")
              .attr("Recorrido", recorrido);
              d3.select("#rangoCien").text(Math.floor(valMaxPERC));
              d3.select(this).attr("data-Leyenda", "H100");
          }
          recorrido++;
        });
        
        }


        d3.select(".PERCdropPERC").on("click", function () {
          let valorEstado = d3.select("#E1x1").attr("data-ANIO");
          if (valorEstado > 0.1) {
            d3.selectAll(".infoError text").style("fill", "none");
            console.log("SI ENTRA IF BOTON");
            d3.json(endpointmeanPERC).then((datosjson) => {
              let meanPERC_PERC = [];
              let meanPERC_Estado = [];
              let meanPERC_PIB = [];
              let meanPERC_GPT = [];
              let i = 0;
              console.log("SI ENTRA ENDPOINT");
    
              //push a Arrays
              datosjson.data.forEach(function (data) {
                meanPERC_Estado.push(data.ESTADO);
                meanPERC_PERC.push(data.PERCAPITA_mean.toFixed(2));
                meanPERC_PIB.push(data.PIB.toFixed(2));
                meanPERC_GPT.push(data.GPT.toFixed(2));
              });
    
              let meanPERC_Estado_long = [...new Set(meanPERC_Estado)];
              console.log("MEANPERCLONG:", meanPERC_Estado_long);
              i = 0;
              let valMaxmeanPERC = Math.max(...meanPERC_PERC);
              //Asignar valores data- a HEATS SVG
              for (let j = 1; j < 33; j++) {
                for (let z = 1; z < 5; z++) {
                  let idtemp = "A" + z + "x" + j;
                  d3.select("#" + idtemp).attr(
                    "data-meanPercESTADO",
                    meanPERC_Estado[i]
                  );
                  d3.select("#" + idtemp).attr("data-meanPercPIB", meanPERC_PIB[i]);
                  d3.select("#" + idtemp).attr(
                    "data-meanPercPERC",
                    meanPERC_PERC[i]
                  );
                  d3.select("#" + idtemp).attr("data-meanPercGPT", meanPERC_GPT[i]);
                  console.log("A", idtemp);
    
                  //Asignar colores A
                  if (meanPERC_PERC[i] <= valMaxmeanPERC*0.1) {
                    d3.select("#" + idtemp)
                      .transition()
                      .duration(1500)
                      .style("fill", "#edf5fc");
                      d3.select("#ArangoDiez").text(Math.floor(valMaxmeanPERC*0.1));
                  }
                  if (meanPERC_PERC[i] > valMaxmeanPERC*0.1 && meanPERC_PERC[i] <= valMaxmeanPERC*0.2) {
                    d3.select("#" + idtemp)
                      .transition()
                      .duration(1500)
                      .style("fill", "#d9e8f5");
                      d3.select("#ArangoVeinte").text(Math.floor(valMaxmeanPERC*0.2));
                  }
                  if (meanPERC_PERC[i] > valMaxmeanPERC*0.2 && meanPERC_PERC[i] <= valMaxmeanPERC*0.3) {
                    d3.select("#" + idtemp)
                      .transition()
                      .duration(1500)
                      .style("fill", "#c3dbee");
                      d3.select("#ArangoTreinta").text(Math.floor(valMaxmeanPERC*0.3));
                  }
                  if (meanPERC_PERC[i] > valMaxmeanPERC*0.3 && meanPERC_PERC[i] <= valMaxmeanPERC*0.4) {
                    d3.select("#" + idtemp)
                      .transition()
                      .duration(1500)
                      .style("fill", "#a5cce4");
                      d3.select("#ArangoCuarenta").text(Math.floor(valMaxmeanPERC*0.4));
                  }
                  if (meanPERC_PERC[i] > valMaxmeanPERC*0.4 && meanPERC_PERC[i] <= valMaxmeanPERC*0.5) {
                    d3.select("#" + idtemp)
                      .transition()
                      .duration(1500)
                      .style("fill", "#80b9da");
                      d3.select("#ArangoCincuenta").text(Math.floor(valMaxmeanPERC*0.5));
                  }
                  if (meanPERC_PERC[i] > valMaxmeanPERC*0.5 && meanPERC_PERC[i] <= valMaxmeanPERC*0.6) {
                    d3.select("#" + idtemp)
                      .transition()
                      .duration(1500)
                      .style("fill", "#5ba3cf");
                      d3.select("#ArangoSesenta").text(Math.floor(valMaxmeanPERC*0.6));
                  }
                  if (meanPERC_PERC[i] > valMaxmeanPERC*0.6 && meanPERC_PERC[i] <= valMaxmeanPERC*0.7) {
                    d3.select("#" + idtemp)
                      .transition()
                      .duration(1500)
                      .style("fill", "#3c8bc3");
                      d3.select("#ArangoSetenta").text(Math.floor(valMaxmeanPERC*0.7));
                  }
                  if (meanPERC_PERC[i] > valMaxmeanPERC*0.7 && meanPERC_PERC[i] <= valMaxmeanPERC*0.8) {
                    d3.select("#" + idtemp)
                      .transition()
                      .duration(1500)
                      .style("fill", "#2271b4");
                      d3.select("#ArangoOchenta").text(Math.floor(valMaxmeanPERC*0.8));
                  }
                  if (meanPERC_PERC[i] > valMaxmeanPERC*0.8 && meanPERC_PERC[i] <= valMaxmeanPERC*0.9) {
                    d3.select("#" + idtemp)
                      .transition()
                      .duration(1500)
                      .style("fill", "#0f579f");
                      d3.select("#ArangoNoventa").text(Math.floor(valMaxmeanPERC*0.9));
                  }
                  if (meanPERC_PERC[i] > valMaxmeanPERC*0.9) {
                    d3.select("#" + idtemp)
                      .transition()
                      .duration(1500)
                      .style("fill", "#083d7e");
                      d3.select("#ArangoCien").text(Math.floor(valMaxmeanPERC));
                  }
                  i++;
                }
              }
            });
          }
        });
    
        d3.select(".PERCdropPIB").on("click", function () {
          let valorEstado = d3.select("#E1x1").attr("data-ANIO");
          if (valorEstado > 0.1) {
            d3.selectAll(".infoError text").style("fill", "none");
            console.log("SI ENTRA IF BOTON");
            d3.json(endpointmeanPERC).then((datosjson) => {
              let meanPERC_PERC = [];
              let meanPERC_Estado = [];
              let meanPERC_PIB = [];
              let meanPERC_GPT = [];
              let i = 0;
              console.log("SI ENTRA ENDPOINT");
    
              //push a Arrays
              datosjson.data.forEach(function (data) {
                meanPERC_Estado.push(data.ESTADO);
                meanPERC_PERC.push(data.PERCAPITA_mean.toFixed(2));
                meanPERC_PIB.push(data.PIB.toFixed(2));
                meanPERC_GPT.push(data.GPT.toFixed(2));
              });
    
              let meanPERC_Estado_long = [...new Set(meanPERC_Estado)];
              console.log("MEANPERCLONG:", meanPERC_Estado_long);
              i = 0;
              //Asignar valores data- a HEATS SVG
              for (let j = 1; j < 33; j++) {
                for (let z = 1; z < 5; z++) {
                  let idtemp = "A" + z + "x" + j;
                  d3.select("#" + idtemp).attr(
                    "data-meanPercESTADO",
                    meanPERC_Estado[i]
                  );
                  d3.select("#" + idtemp).attr("data-meanPercPIB", meanPERC_PIB[i]);
                  d3.select("#" + idtemp).attr(
                    "data-meanPercPERC",
                    meanPERC_PERC[i]
                  );
                  d3.select("#" + idtemp).attr("data-meanPercGPT", meanPERC_GPT[i]);
                  console.log("A", idtemp);
    
                  //Asignar colores A
                  if (meanPERC_PIB[i] <= 0.5) {
                    d3.select("#" + idtemp)
                      .transition()
                      .duration(1500)
                      .style("fill", "#e3eef9");
                  }
                  if (meanPERC_PIB[i] > 0.5 && meanPERC_PIB[i] <= 1) {
                    d3.select("#" + idtemp)
                      .transition()
                      .duration(1500)
                      .style("fill", "#bdd9eb");
                  }
                  if (meanPERC_PIB[i] > 1 && meanPERC_PIB[i] <= 2.5) {
                    d3.select("#" + idtemp)
                      .transition()
                      .duration(1500)
                      .style("fill", "#6daed5");
                  }
                  if (meanPERC_PIB[i] > 2.5 && meanPERC_PIB[i] <= 3) {
                    d3.select("#" + idtemp)
                      .transition()
                      .duration(1500)
                      .style("fill", "#2f7ebc");
                  }
                  if (meanPERC_PIB[i] > 3 && meanPERC_PIB[i] <= 10) {
                    d3.select("#" + idtemp)
                      .transition()
                      .duration(1500)
                      .style("fill", "#0a4a90");
                  }
                  i++;
                }
              }
            });
          }
        });
        //querySlector JS
    
        d3.select(".PERCdropGPT").on("click", function () {
          let valorEstado = d3.select("#E1x1").attr("data-ANIO");
          if (valorEstado > 0.1) {
            d3.selectAll(".infoError text").style("fill", "none");
            console.log("SI ENTRA IF BOTON");
            d3.json(endpointmeanPERC).then((datosjson) => {
              let meanPERC_PERC = [];
              let meanPERC_Estado = [];
              let meanPERC_PIB = [];
              let meanPERC_GPT = [];
              let i = 0;
              console.log("SI ENTRA ENDPOINT");
    
              //push a Arrays
              datosjson.data.forEach(function (data) {
                meanPERC_Estado.push(data.ESTADO);
                meanPERC_PERC.push(data.PERCAPITA_mean.toFixed(2));
                meanPERC_PIB.push(data.PIB.toFixed(2));
                meanPERC_GPT.push(data.GPT.toFixed(2));
              });
    
              let meanPERC_Estado_long = [...new Set(meanPERC_Estado)];
              console.log("MEANPERCLONG:", meanPERC_Estado_long);
              i = 0;
              //Asignar valores data- a HEATS SVG
              for (let j = 1; j < 33; j++) {
                for (let z = 1; z < 5; z++) {
                  let idtemp = "A" + z + "x" + j;
                  d3.select("#" + idtemp).attr(
                    "data-meanPercESTADO",
                    meanPERC_Estado[i]
                  );
                  d3.select("#" + idtemp).attr("data-meanPercPIB", meanPERC_PIB[i]);
                  d3.select("#" + idtemp).attr(
                    "data-meanPercPERC",
                    meanPERC_PERC[i]
                  );
                  d3.select("#" + idtemp).attr("data-meanPercGPT", meanPERC_GPT[i]);
                  console.log("A", idtemp);
    
                  //Asignar colores A
                  if (meanPERC_GPT[i] <= 10) {
                    d3.select("#" + idtemp)
                      .transition()
                      .duration(1500)
                      .style("fill", "#e3eef9");
                  }
                  if (meanPERC_GPT[i] > 10 && meanPERC_GPT[i] <= 15) {
                    d3.select("#" + idtemp)
                      .transition()
                      .duration(1500)
                      .style("fill", "#bdd9eb");
                  }
                  if (meanPERC_GPT[i] > 15 && meanPERC_GPT[i] <= 20) {
                    d3.select("#" + idtemp)
                      .transition()
                      .duration(1500)
                      .style("fill", "#6daed5");
                  }
                  if (meanPERC_GPT[i] > 20 && meanPERC_GPT[i] <= 28) {
                    d3.select("#" + idtemp)
                      .transition()
                      .duration(1500)
                      .style("fill", "#2f7ebc");
                  }
                  if (meanPERC_GPT[i] > 28 && meanPERC_GPT[i] <= 100) {
                    d3.select("#" + idtemp)
                      .transition()
                      .duration(1500)
                      .style("fill", "#0a4a90");
                  }
                  i++;
                }
              }
            });
          }
        });
    

    let matColor = [];


    //print datos- en SVG con d3
    d3.selectAll("#HEATS path").on("mouseenter", function () {
      //d3.select(this).style("fill", "#FFFFFF");
      //d3.select(this).transition.duration(350).style("fill", "#FFFFFF");
      let valorEstado = d3.select(this).attr("data-ESTADO");
      let valorEstadoPrint = d3.select(this).attr("data-ESTADOPRINT");
      let valoresANIO = d3.select(this).attr("data-ANIO");
      let valoresPOSICION = d3.select(this).attr("data-POSICION");
      let valoresPIB = d3.select(this).attr("data-PIB");
      let valoresPERCAPITA = d3.select(this).attr("data-PERC");
      let valoresGPT = d3.select(this).attr("data-GPT");

      d3.select("#infoESTADO").text(valorEstadoPrint);
      d3.select("#infoANIO").text(valoresANIO);
      d3.select("#infoPOSICION").text(valoresPOSICION);
      d3.select("#infoPIB").text(valoresPIB);
      d3.select("#infoPERCAPITA").text(valoresPERCAPITA);
      d3.select("#infoGPT").text(valoresGPT);

      let parseOrden = parseInt(valoresPOSICION);
      if(parseOrden<=16){
        d3.selectAll("#CircDer text").text("");
      d3.select("#infoESTADOizq").text(valorEstado);
      d3.select("#infoANIOizq").text(valoresANIO);
      d3.select("#infoPOSICIONizq").text(valoresPOSICION); 
      if (valorEstado === "EDOMEX") {
        valorEstado = "MEX";
      }
      }
      
      if(parseOrden>16){
        d3.selectAll("#CircIzq text").text("");
        d3.select("#infoESTADOder").text(valorEstado);
        d3.select("#infoANIOder").text(valoresANIO);
        d3.select("#infoPOSICIONder").text(valoresPOSICION);
        if (valorEstado === "EDOMEX") {
          valorEstado = "MEX";
        }
        }
      
        let leyendaHover = d3.select(this).attr("data-Leyenda");
        d3.select("#"+leyendaHover).style("stroke","#89BF4D").style("stroke-width",8).raise();
  
  
        d3.select(this).on("mouseleave", function () {
  
          d3.select("#"+leyendaHover).style("stroke","none");
    
        });
  d3.selectAll("#infoHover text").style("fill", "#FFFFFF");
  //d3.selectAll("#CircDer text").style("fill","none");
  //d3.selectAll("#CircIzq text").style("fill","none");
  d3.selectAll("#variables text").style("fill", "#FFFFFF");
    });


 
  
  });
});
