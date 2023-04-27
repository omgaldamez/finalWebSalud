let endpointPERC = "datos/JSON_PERC.json";
let endpointPIB = "datos/JSON_PIB.json";
let endpointGPT = "datos/JSON_GPT.json";
let endpointmeanPERC = "datos/JSON_meanPERC.json";
let endpointmeanPIB = "datos/JSON_meanPIB.json";
let endpointmeanGPT = "datos/JSON_meanGPT.json";

//Se activa con boton Orden PERCAPITA
d3.selectAll(".dropbtn").on("click", function () {
  let tempDrop = d3.select(this).attr("id");
  if(tempDrop==="dropbtnPERC"){
    var tempDropSelect = endpointPERC;
    var tempAZULDropSelect = endpointmeanPERC;
    var printSel = "PERC";
  }
  if(tempDrop==="dropbtnPIB"){
    tempDropSelect = endpointPIB;
    tempAZULDropSelect = endpointmeanPIB;
    printSel = "PIB";
  }
  if(tempDrop==="dropbtnGPT"){
    tempDropSelect = endpointGPT;
    tempAZULDropSelect = endpointmeanGPT;
    printSel = "GPT";
  }
  d3.json(tempDropSelect).then((datosjson) => {
    console.log("ENDPOINT: ", tempDropSelect);
    let DATAendpointEstado = [];
    let DATAendpointANIO = [];
    let DATAendpointPosicion = [];
    let DATAendpointPERC = [];
    let DATAendpointPIB = [];
    let DATAendpointGPT = [];
    let DATAendpointEstadoPrint = [];
    let i = 0;

    //push a Arrays
    datosjson.data.forEach(function (data) {
      DATAendpointPERC.push(data.PERCAPITA.toFixed(0));
      DATAendpointPIB.push(data.PIB.toFixed(2));
      DATAendpointGPT.push(data.GPT.toFixed(2));
      DATAendpointEstadoPrint.push(data.EstadoPrint);
      DATAendpointEstado.push(data.Estado);
      DATAendpointANIO.push(data.Anio);
      if(tempDropSelect==endpointPERC){
        DATAendpointPosicion.push(data.OrdenPERC);
        console.log("DATACHIAPAS: ",DATAendpointPERC[0]);
      }
      if(tempDropSelect==endpointPIB){
        DATAendpointPosicion.push(data.OrdenPIB);

      }
      if(tempDropSelect==endpointGPT){
        DATAendpointPosicion.push(data.OrdenGPT);
      }
    });

        //Reverse y Splice
    let DATAendpointEstado_long = [...new Set(DATAendpointEstado)];
        let parts = 32;
        let partSize = Math.ceil(DATAendpointPERC.length / parts);
        for (i = 0; i < DATAendpointPERC.length; i += partSize) {
          let partPERC = DATAendpointPERC.slice(i, i + partSize).reverse();
          let partPIB = DATAendpointPIB.slice(i, i + partSize).reverse();
          let partGPT = DATAendpointGPT.slice(i, i + partSize).reverse();
          let partEstado = DATAendpointEstado.slice(i, i + partSize).reverse();
          let partAnio = DATAendpointANIO.slice(i, i + partSize).reverse();
          let partPosicion = DATAendpointPosicion.slice(i, i + partSize).reverse();
          let partEstado_Print = DATAendpointEstadoPrint.slice(i, i + partSize).reverse();

          DATAendpointPERC.splice(i, partSize, ...partPERC);
          DATAendpointPIB.splice(i, partSize, ...partPIB);
          DATAendpointEstadoPrint.splice(i, partSize, ...partEstado_Print);
          DATAendpointGPT.splice(i, partSize, ...partGPT);
          DATAendpointEstado.splice(i, partSize, ...partEstado);
          DATAendpointANIO.splice(i, partSize, ...partAnio);
          DATAendpointPosicion.splice(i, partSize, ...partPosicion);
        }

        
    d3.selectAll("#AZUL path").style("fill", "none");
    //asignar data-OrdenEstado y modificar texto Entidades SVG
    for (let j = 1; j < DATAendpointEstado_long.length + 1; j++) {
      let idtemp = "ENT" + j;
      if (DATAendpointEstado_long[j - 1] === "EDOMEX") {
        DATAendpointEstado_long[j - 1] = "MEX";
      }
      d3.select("#" + idtemp).attr(
        "data-OrdenEstado",
        DATAendpointEstado_long[j - 1]
      );

      d3.select("#" + idtemp)
        .select("tspan")
        .text(DATAendpointEstado_long[j - 1]);
    }

    //Prender textos
    d3.selectAll("#ENTIDAD tspan").style("fill", "#FFFFFF");
    d3.selectAll("#ANIO tspan").style("fill", "#FFFFFF");
    d3.selectAll("#ANIO text").style("fill", "#FFFFFF");
    d3.selectAll("#ANIO path").style("stroke", "#FFFFFF");
    d3.selectAll("#ENTIDAD text").style("fill", "#FFFFFF");
    d3.selectAll("#NUM text").style("fill", "#FFFFFF");
    d3.selectAll("#HEATS path").style("stroke","#8d8c8c").style("stroke-width", "1.5");

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

        var recorrido=0;
        for(let fillE =1; fillE<=32; fillE++){
        var pathSelector = "#E" + fillE + " path[data-y]";
        const pathFilter1 = d3.selectAll(pathSelector).filter((d,i) => i <23);
        
        var dataYArray = [];
        
        pathFilter1.each(function(d, i) {
          var dataYValue = d3.select(this).attr("data-y");
          dataYArray.push(parseFloat(dataYValue));
          dataYArray = dataYArray.sort().reverse();

          d3.select(this).attr("data-PERC", DATAendpointPERC[recorrido])
          .attr("data-PIB", DATAendpointPIB[recorrido]).
          attr("data-GPT", DATAendpointGPT[recorrido]).
          attr("data-ESTADO", DATAendpointEstado[recorrido]).
          attr("data-ANIO", DATAendpointANIO[recorrido]).
          attr("data-POSICION", DATAendpointPosicion[recorrido]).
          attr("data-ESTADOPRINT", DATAendpointEstadoPrint[recorrido]);

      
  if(tempDrop==="dropbtnPERC"){
    var valMaxPERC = Math.max(...DATAendpointPERC);
    var indicadorSel=d3.select(this).attr("data-PERC");
  }
  if(tempDrop==="dropbtnPIB"){
    valMaxPERC = Math.max(...DATAendpointPIB);
    indicadorSel=d3.select(this).attr("data-PIB");
  }
  if(tempDrop==="dropbtnGPT"){
    valMaxPERC = Math.max(...DATAendpointGPT);
    indicadorSel=d3.select(this).attr("data-GPT");
  }
          //Asignar colores HEATMAP
        if (indicadorSel <= (valMaxPERC*0.1)  ) {
            d3.select(this)
              .transition()
              .duration(1500)
              .style("fill", "#FFF1E4")
              .attr("Recorrido", recorrido);
              d3.select("#rangoDiez").text(Math.floor(valMaxPERC*0.1));
              d3.select(this).attr("data-Leyenda", "H10");
          }
          if (indicadorSel <= 1) {
              d3.select(this)
                .transition()
                .duration(1500)
                .style("fill", "#FFF1E4")
                .attr("Recorrido", recorrido);
                d3.select("#rangoDiez").text("<1");
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

        d3.selectAll(".AZULdrop").on("click", function () {
          let azulSeleccionado
          azulSeleccionado = d3.select(this).attr("id");

          console.log("ENTRA AZULDROP");
          let valorEstado = d3.select("#E1x1").attr("data-ANIO");
          if (valorEstado > 0.1) {
            d3.json(tempAZULDropSelect).then((datosjson) => {
              console.log("ENTRA JSON MEAN: ",tempAZULDropSelect);
              let meanPERC_PERC = [];
              let meanPERC_Estado = [];
              let meanPERC_PIB = [];
              let meanPERC_GPT = [];
              let i = 0;
    
              //push a Arrays
              datosjson.data.forEach(function (data) {
                meanPERC_Estado.push(data.ESTADO);
                meanPERC_PERC.push(data.PERCAPITA.toFixed(2));
                meanPERC_PIB.push(data.PIB.toFixed(2));
                meanPERC_GPT.push(data.GPT.toFixed(2));
              });
              i = 0;
              
          if(azulSeleccionado === "dropPERC"){
            var valMaxmeanPERC = Math.max(...meanPERC_PERC);
            var meanTemp = meanPERC_PERC;
                      }
                      if(azulSeleccionado === "dropPIB"){
                        valMaxmeanPERC = Math.max(...meanPERC_PIB);
                        meanTemp = meanPERC_PIB;
                      }
                      if(azulSeleccionado === "dropGPT"){
                        valMaxmeanPERC = Math.max(...meanPERC_GPT);
                        meanTemp = meanPERC_GPT;
                      }

              //Asignar valores data- a AZUL
              for (let j = 1; j < 33; j++) {
                for (let z = 1; z < 5; z++) {
                  let idtemp = "A" + z + "x" + j;
                  d3.select("#" + idtemp).attr(
                    "data-meanPercESTADO",
                    meanPERC_Estado[i]
                  );
                  d3.select("#" + idtemp).attr("data-meanPercPIB", meanPERC_PIB[i]).attr(
                    "data-meanPercPERC",meanPERC_PERC[i]).attr("data-meanPercGPT", meanPERC_GPT[i]);
    
                  //Asignar colores A

                  
                  if (meanTemp[i] <= valMaxmeanPERC*0.1) {
                    d3.select("#" + idtemp)
                      .transition()
                      .duration(1500)
                      .style("fill", "#edf5fc");
                      d3.select("#ArangoDiez").text((valMaxmeanPERC*0.1).toFixed(2));
                  }
                  if (meanTemp[i] > valMaxmeanPERC*0.1 && meanTemp[i] <= valMaxmeanPERC*0.2) {
                    d3.select("#" + idtemp)
                      .transition()
                      .duration(1500)
                      .style("fill", "#d9e8f5");
                      d3.select("#ArangoVeinte").text((valMaxmeanPERC*0.2).toFixed(2));
                  }
                  if (meanTemp[i] > valMaxmeanPERC*0.2 && meanTemp[i] <= valMaxmeanPERC*0.3) {
                    d3.select("#" + idtemp)
                      .transition()
                      .duration(1500)
                      .style("fill", "#c3dbee");
                      d3.select("#ArangoTreinta").text((valMaxmeanPERC*0.3).toFixed(2));
                  }
                  if (meanTemp[i] > valMaxmeanPERC*0.3 && meanTemp[i] <= valMaxmeanPERC*0.4) {
                    d3.select("#" + idtemp)
                      .transition()
                      .duration(1500)
                      .style("fill", "#a5cce4");
                      d3.select("#ArangoCuarenta").text((valMaxmeanPERC*0.4).toFixed(2));
                  }
                  if (meanTemp[i] > valMaxmeanPERC*0.4 && meanTemp[i] <= valMaxmeanPERC*0.5) {
                    d3.select("#" + idtemp)
                      .transition()
                      .duration(1500)
                      .style("fill", "#80b9da");
                      d3.select("#ArangoCincuenta").text((valMaxmeanPERC*0.5).toFixed(2));
                  }
                  if (meanTemp[i] > valMaxmeanPERC*0.5 && meanTemp[i] <= valMaxmeanPERC*0.6) {
                    d3.select("#" + idtemp)
                      .transition()
                      .duration(1500)
                      .style("fill", "#5ba3cf");
                      d3.select("#ArangoSesenta").text((valMaxmeanPERC*0.6).toFixed(2));
                  }
                  if (meanTemp[i] > valMaxmeanPERC*0.6 && meanTemp[i] <= valMaxmeanPERC*0.7) {
                    d3.select("#" + idtemp)
                      .transition()
                      .duration(1500)
                      .style("fill", "#3c8bc3");
                      d3.select("#ArangoSetenta").text((valMaxmeanPERC*0.7).toFixed(2));
                  }
                  if (meanTemp[i] > valMaxmeanPERC*0.7 && meanTemp[i] <= valMaxmeanPERC*0.8) {
                    d3.select("#" + idtemp)
                      .transition()
                      .duration(1500)
                      .style("fill", "#2271b4");
                      d3.select("#ArangoOchenta").text((valMaxmeanPERC*0.8).toFixed(2));
                  }
                  if (meanTemp[i] > valMaxmeanPERC*0.8 && meanTemp[i] <= valMaxmeanPERC*0.9) {
                    d3.select("#" + idtemp)
                      .transition()
                      .duration(1500)
                      .style("fill", "#0f579f");
                      d3.select("#ArangoNoventa").text((valMaxmeanPERC*0.9).toFixed(2));
                  }
                  if (meanTemp[i] > valMaxmeanPERC*0.9) {
                    d3.select("#" + idtemp)
                      .transition()
                      .duration(1500)
                      .style("fill", "#083d7e");
                      d3.select("#ArangoCien").text((valMaxmeanPERC).toFixed(2));
                  }
                  i++;
                }
              }
            });
          }
        });
    
    let matColor = [];


    d3.selectAll("#leyendaHeatsRect").style("display","block");
    d3.selectAll("#leyendaAzul").style("display","block");

    var estransicion = {};

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
    //d3.select(this).transition().duration(1000).attr("transform", "scale(1.1)");
    //d3.select(this).transition().duration(1000).attr("transform", "translate(50,50) scale(0.9)");



        //d3.select(this).transition().duration(1000).attr("transform","matrix(0,1,1,0,0,0)");

        if(tempDrop==="dropbtnPERC"){
          var printCirc = valoresPERCAPITA;
        }
        if(tempDrop==="dropbtnPIB"){
          printCirc = valoresPIB;
        }
        if(tempDrop==="dropbtnGPT"){
          printCirc = valoresGPT;
        }

      let parseOrden = parseInt(valoresPOSICION);
      if(parseOrden<=16){
        d3.selectAll("#CircDer text").text("");
      d3.select("#infoESTADOizq").text(printCirc);
      d3.select("#infoANIOizq").text(printSel);
      d3.select("#infoPOSICIONizq").text(valorEstado); 
      if (valorEstado === "EDOMEX") {
        valorEstado = "MEX";
      }
      
      // if(!estransicion[this.id]){
      //   estransicion[this.id] = true;
      
      // d3.select(this)
      // .raise()
      // .style("stroke", "#000000")
      // .style("stroke-width",5)
      // .transition()
      // .duration(500)
      // .attr("transform", "scale(1.1)")
      // .transition()
      // .duration(500)
      // .transition()
      // .delay(500)
      // .on("start", function(){
      //   console.log("2 SEGUNDOS");
      // })
      // .attr("transform", "scale(1)")
      // .style("stroke", "rgb(141,140,140)")
      // .style("stroke-width",1.1042);
      // }
      }
      
      if(parseOrden>16){
        d3.selectAll("#CircIzq text").text("");
        d3.select("#infoESTADOder").text(printCirc);
        d3.select("#infoANIOder").text(printSel);
        d3.select("#infoPOSICIONder").text(valorEstado);
        // if (valorEstado === "EDOMEX") {
        //   valorEstado = "MEX";
        // }
        // d3.select(this)
        // .raise()
        // .transition()
        // .duration(500)
        // .attr("transform", "skewX(2) skewY(1)")
        // .transition()
        // .delay(500)
        // .on("start", function(){
        //   console.log("2 SEGUNDOS");
        // })
        // .transition()
        // .duration(500)
        // .attr("transform", "skewX(0) skewY(0)");
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



    //d3.selectAll("#HEATS path").on("mouseleave", function () {
 
      //d3.select(this).transition().duration(1000).attr("transform", "scale(1)");
    //});
  


  });
});





