let endpointPERC = "datos/JSON_PERC.json";
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
      OrdenPERC_PERC.push(data.PERCAPITA.toFixed(2));
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
    d3.selectAll(".infoHover text").style("fill", "#FFFFFF");
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


          //Asignar colores HEATMAP
          let indicadorSel=d3.select(this).attr("data-PERC");
        if (indicadorSel <= 1000) {
            d3.select(this)
              .transition()
              .duration(1500)
              .style("fill", "#FFEDDC")
              .attr("Recorrido", recorrido);
          }
          if (indicadorSel > 1000 && indicadorSel <= 2000) {
            d3.select(this)
              .transition()
              .duration(1500)
              .style("fill", "#FDE0C1")
              .attr("Recorrido", recorrido);
          }
          if (indicadorSel > 2000 && indicadorSel <= 3000) {
            d3.select(this)
              .transition()
              .duration(1500)
              .style("fill", "#FDC999")
              .attr("Recorrido", recorrido);
          }
          if (indicadorSel > 3000 && indicadorSel <= 4000) {
            d3.select(this)
              .transition()
              .duration(1500)
              .style("fill", "#FDA25C")
              .attr("Recorrido", recorrido);
          }
          if (indicadorSel > 4000 && indicadorSel <= 5000) {
            d3.select(this)
              .transition()
              .duration(1500)
              .style("fill", "#F99756")
              .attr("Recorrido", recorrido);
          }
          if (indicadorSel > 5000 && indicadorSel <= 8000) {
            d3.select(this)
              .transition()
              .duration(1500)
              .style("fill", "#E56017")
              .attr("Recorrido", recorrido);
          }
          if (indicadorSel > 8000 && indicadorSel <= 13000) {
            d3.select(this)
              .transition()
              .duration(1500)
              .style("fill", "#C2480D")
              .attr("Recorrido", recorrido);
          }
          if (indicadorSel > 13000 && indicadorSel <= 14000) {
            d3.select(this)
              .transition()
              .duration(1500)
              .style("fill", "#953307")
              .attr("Recorrido", recorrido);
          }
          recorrido++;
        });
        
        }


    let matColor = [];

    let uniqueColor = [...new Set(matColor)];

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

      
  d3.selectAll("#infoHover text").style("fill", "#FFFFFF");
  d3.selectAll("#variables text").style("fill", "#FFFFFF");
    });

    let NoE32 = "#E31, #E30";
    //console.log("----------->", NoE32);
    d3.select("#E32")
      .on("mouseover", function () {
        //if (d3.select(this).attr("id") !== "E32") {
        d3.selectAll(NoE32).transition().duration(150).style("opacity", 0.5);
        //}
      })

      .on("mouseleave", function () {
        //if (d3.select(this).attr("id") !== "E32") {
        d3.selectAll(NoE32).transition().duration(150).style("opacity", 1);
        //}
      });
  });
});
