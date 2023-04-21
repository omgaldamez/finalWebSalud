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


        d3.select("#TC1").text("Estado: " + match.NOMBRE);
        d3.select("#TC2").text("index " + match.index);
        d3.select("#TC3").text("S1 " + match.S1);
        d3.select("#TC4").text("S2 " + match.S2);
        d3.select("#TC5").text("S1vsS2% " + match.S1vsS2);
        //d3.select(this).attr("transform", "translate(0,-150)");

      });

      d3.selectAll("#header text").on("mouseenter", function () {
      d3.select("#TC6").text("Sexenio Comparado: " + this.innerHTML);
    });
 
  d3.selectAll("#Estados text")
  .attr("data-Entidad", function() {
    return this.innerHTML;
  });

  d3.selectAll("#header text")
  .attr("data-SexenioComparado", function() {
    return this.innerHTML;
  });
  



// Access values using dot notation
console.log(Entidad);
console.log(Entidad[0]);
console.log(datosjson.data.Entidad);
console.log(datosjson);

const siblings = datosjson.data.filter(row => row.ENTIDAD === 'AGS');
console.log("filtro: ", siblings)
console.log("filtro2: ", siblings.index)
console.log("filtro2: ", siblings[0].index)

});

