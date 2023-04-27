let endpoint_ArrowPIB = "datos/JSON_SexeniosPIB.json";

d3.json(endpoint_ArrowPIB).then((datosjson) => {
  let Entidad = [];
  let S1 = [];
  let S2 = [];
  let S3 = [];
  let S4 = [];
  let S1vsS2 = [];
  let tituloArrow=[];

  let i = 0;

  datosjson.data.forEach(function (data) {
    S1.push(data.S1);
    S2.push(data.S2);
    S3.push(data.S3);
    S4.push(data.S4);
    S1vsS2.push(data.S1vsS2);
    Entidad.push(data.ENTIDAD);

    
    let top5 = [];
    let ult5 = [];



    top5 = S1vsS2.slice(0,5);
    ult5 = S1vsS2.slice(-5);

    
    d3.select("#estMax1").text(top5[0]);
    d3.select("#estMax2").text(top5[1]);
    d3.select("#estMax3").text(top5[2]);
    d3.select("#estMax4").text(top5[3]);
    d3.select("#estMax5").text(top5[4]);
  });

      d3.selectAll("#Estados text").on("click", function () {
        let estadoSeleccionado = this.innerHTML;
        const match = searchSiblings(estadoSeleccionado, "ENTIDAD");


        function searchSiblings(searchString, columnName) {
          for (let i = 0; i < datosjson.data.length; i++) {
            if (datosjson.data[i][columnName] === searchString) {
              return datosjson.data[i];
            }
          }
          return null;
        }
        console.log("match: ",match); // prints {index: 0, ENTIDAD: "AGS", S1: "2.32%", S2: "2.79%", S3: "3.11%", S4: "2.93%", S1vsS2: "20%", S1vsS3:
        console.log("match index: ",match.S2); // prints {index: 0, ENTIDAD: "AGS", S1: "2.32%", S2: "2.79%", S3: "3.11%", S4: "2.93%", S1vsS2: "20%", S1vsS3:
        
      let tempTitulo = d3.select("#header text").text();
        
        d3.select("#TC1").text(tempTitulo);
        d3.select("#TC2").text("El estado de " + match.NOMBRE+ " inició el sexenio con un PIB de "+match.S1+" terminando con un PIB de " + match.S2);
        d3.select("#TC3").text("Representa un cambio del "+match.S1vsS2, " respecto al sexenio inicial");
        
        //d3.select(this).attr("transform", "translate(0,-150)");


    });
 
  d3.selectAll("#Estados text")
  .attr("data-Entidad", function() {
    return this.innerHTML;
  });

  d3.selectAll("#header text")
  .attr("data-SexenioComparado", function() {
    return this.innerHTML;
  });
  



// console.log(Entidad);
// console.log(Entidad[0]);
// console.log(datosjson.data.Entidad);
// console.log(datosjson);

// const siblings = datosjson.data.filter(row => row.ENTIDAD === 'AGS');
// console.log("filtro: ", siblings)
// console.log("filtro2: ", siblings.index)
// console.log("filtro2: ", siblings[0].index)

});

