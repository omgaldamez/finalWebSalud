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
    let i = 0;

    //push a Arrays
    datosjson.data.forEach(function (data) {
      OrdenPERC_Estado.push(data.Estado);
      OrdenPERC_ANIO.push(data.Anio);
      OrdenPERC_Posicion.push(data.Orden);
      OrdenPERC_PERC.push(data.PERCAPITA.toFixed(2));
      OrdenPERC_PIB.push(data.PIB.toFixed(2));
      OrdenPERC_PIBmean.push(data.PIBmean);
      OrdenPERC_GPT.push(data.GPT.toFixed(2));
    });


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

          OrdenPERC_PERC.splice(i, partSize, ...partPERC);
          OrdenPERC_PIB.splice(i, partSize, ...partPIB);
          
          OrdenPERC_GPT.splice(i, partSize, ...partGPT);
          OrdenPERC_Estado.splice(i, partSize, ...partEstado);
          OrdenPERC_ANIO.splice(i, partSize, ...partAnio);
          OrdenPERC_Posicion.splice(i, partSize, ...partPosicion);
        }

        
        
        console.log("ORDEN PERC REVERSE: ", OrdenPERC_PERC);
        console.log("ORDEN PIB REVERSE: ", OrdenPERC_PIB);

    d3.selectAll(".azules path").style("fill", "none");
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

      if (j < 17) {
        d3.select("#" + idtemp)
          .select("textPath")
          .attr("startOffset", "10%");
      }
      if (j >= 17) {
        d3.select("#" + idtemp)
          .select("textPath")
          .attr("startOffset", "35%");
      }
    }

    //Prender textos
    d3.selectAll(".textos tspan").style("fill", "#FFFFFF");
    d3.selectAll(".infoHover text").style("fill", "#FFFFFF");
    d3.selectAll(".textoANIO tspan").style("fill", "#FFFFFF");

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
        });

          d3.select(this).attr("data-PIB", function(d,i){
            var dataPIB = OrdenPERC_PIB[recorrido];
            return dataPIB;
          });

          d3.select(this).attr("data-PIB", function(d,i){
            var dataPIB = OrdenPERC_PIB[recorrido];
            return dataPIB;
          });

          d3.select(this).attr("data-PIB", function(d,i){
            var dataPIB = OrdenPERC_PIB[recorrido];
            return dataPIB;
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
        
        console.log(dataYArray); // output the array to the console
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
              if (meanPERC_PERC[i] <= 2351) {
                d3.select("#" + idtemp)
                  .transition()
                  .duration(1500)
                  .style("fill", "#e3eef9");
              }
              if (meanPERC_PERC[i] > 2351 && meanPERC_PERC[i] <= 3400) {
                d3.select("#" + idtemp)
                  .transition()
                  .duration(1500)
                  .style("fill", "#bdd9eb");
              }
              if (meanPERC_PERC[i] > 3400 && meanPERC_PERC[i] <= 4000) {
                d3.select("#" + idtemp)
                  .transition()
                  .duration(1500)
                  .style("fill", "#6daed5");
              }
              if (meanPERC_PERC[i] > 4000 && meanPERC_PERC[i] <= 4800) {
                d3.select("#" + idtemp)
                  .transition()
                  .duration(1500)
                  .style("fill", "#2f7ebc");
              }
              if (meanPERC_PERC[i] > 4800 && meanPERC_PERC[i] <= 12000) {
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

    //querySlector JS
    const x = document.querySelectorAll("g");
    let capas = [];
    x.forEach(function (item) {
      capas.push(item.getAttribute("id"));
      item.addEventListener("click", function () {
        const t = item.getAttribute("id");
        //console.log("click: ", t);
      });
    });

    const p = document.querySelectorAll("path");
    let Subcapas = [];
    let matColor = [];
    p.forEach(function (item) {
      matColor.push(item.getAttribute("fill"));
      Subcapas.push(item.getAttribute("id"));
      item.addEventListener("mouseover", function () {
        //const t = item.getAttribute("id");
      });
    });

    let uniqueColor = [...new Set(matColor)];

    //print datos- en SVG con d3
    d3.selectAll(".x path").on("mouseenter", function () {
      //d3.select(this).style("fill", "#FFFFFF");
      //d3.select(this).transition.duration(350).style("fill", "#FFFFFF");
      let valorEstado = d3.select(this).attr("data-ESTADO");
      let valoresANIO = d3.select(this).attr("data-ANIO");
      let valoresPOSICION = d3.select(this).attr("data-POSICION");
      let valoresPIB = d3.select(this).attr("data-PIB");
      let valoresPERCAPITA = d3.select(this).attr("data-PERC");
      let valoresGPT = d3.select(this).attr("data-GPT");

      d3.select("#infoESTADO").text(valorEstado);
      d3.select("#infoANIO").text(valoresANIO);
      d3.select("#infoPOSICION").text(valoresPOSICION);
      d3.select("#infoPIB").text(valoresPIB);
      d3.select("#infoPERCAPITA").text(valoresPERCAPITA);
      d3.select("#infoGPT").text(valoresGPT);
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
